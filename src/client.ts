import { Client, Collection } from "discord.js";
import { readdir, readFile, stat, writeFile } from "fs/promises";
import mongoose, { Connection } from "mongoose";
import { Command } from "./objects/commands/Command";
import { Event } from "./objects/Event";
import { GuildWrapper } from "./objects/GuildWrapper";
import { IModule } from "./objects/modules/IModule";
import { Pair } from "./objects/Pair";
import { Settings } from "./objects/Settings";
import { doesFileExist, findFiles } from "./util/FileUtil";

export class WrappedClient extends Client {

    static instance: WrappedClient = null;

    commands: Collection<string, Command>;
    aliases: Collection<string, Command>;

    modules: Collection<string, IModule>;

    settings: Settings;

    wrappedGuilds: Collection<string, GuildWrapper>;

    database: Connection;

    constructor(options?) {
        super(options);
        this.commands = new Collection;
        this.aliases = new Collection;
        this.wrappedGuilds = new Collection;
        this.modules = new Collection;
        this.settings = new Settings();
        WrappedClient.instance = this;
    }

    async initialize(): Promise<void> {
        await this.loadAllModules(true, true);
        await this.createSettings();
        await this.loadSettings();
        await this.loadDatabase();
    }

    async indexModules(): Promise<Map<string, string>> {
        const folders = await Promise.all((await readdir("./modules/")).filter(async f => (await stat(`./modules/${f}`)).isDirectory()).map(f => `./modules/${f}/`));
        folders.unshift("./");

        const modules: Map<string, string> = new Map();

        for (let i = 0; i < folders.length; i++) {
            const path = folders[i];
            const files = await findFiles(`${path}`, false);
            if (files.includes("Module.ts")) {
                let props = await import(`${path}/Module`);
                const module: IModule = new props[Object.keys(props)[0]]();
                this.modules.set(module.identifier, module);
                modules.set(module.identifier, path);
            }
        }

        return modules;
    }

    async loadAllModules(commands: boolean, events: boolean): Promise<Pair<number, number>> {
        return new Promise(async resolve => {
            if (commands) this.commands.clear();
            if (events) this.removeAllListeners();
            const modules: Map<string, string> = await this.indexModules();
            const mods = Array.from(modules);
            for (let i = 0; i < mods.length; i++) {
                await this.loadModule(commands, events, mods[i][1], mods[i][0]);
            }
            resolve(new Pair(commands ? this.commands.size : undefined, events ? this.getEventCount() : undefined));
        });
    }

    async loadModule(commands: boolean, events: boolean, path: string, module: string): Promise<void> {
        const loadedCmds = commands ? await this.loadCommands(module, path) : 0;
        const loadedEvents = events ? await this.loadEvents(module, path) : 0;
        this.modules.get(module).commands = loadedCmds;
        this.modules.get(module).events = loadedEvents;
        console.log(`Loaded module: ${this.modules.get(module).name}`)
        console.log(`Loaded ${loadedCmds} commands (Total ${this.commands.size})`);
        console.log(`Loaded ${loadedEvents} events (Total ${this.getEventCount()})`);
        console.log("--------------------");
    }

    async loadCommands(module: string, path: string): Promise<number> {
        return new Promise(async res => {
            const tsfiles = (await findFiles(`${path}commands`, true)).filter(f => !f.includes("subcommand")).filter(f => f.endsWith(".ts") || f.endsWith(".js"))
            if (tsfiles.length > 0)
                for (const file of tsfiles) {
                    let props = await import(`${path}commands/${file}`);
                    const com: Command = new props[Object.keys(props)[0]]();
                    com.module = module;
                    this.commands.set(com.label, com);
                    if (com.aliases) com.aliases.forEach(alias => this.aliases.set(alias, com));
                    delete require.cache[require.resolve(`${path}commands/${file}`)];
                }
            res(tsfiles.length);
        })
    }

    async loadEvents(module: string, path: string): Promise<number> {
        return new Promise(async res => {
            const tsfiles = (await findFiles(`${path}events/`, true)).filter(f => f.endsWith(".ts") || f.endsWith(".js"))
            if (tsfiles.length > 0)
                for (const file of tsfiles) {
                    const props = await import(`${path}events/${file}`);
                    const ev: Event = new props[Object.keys(props)[0]]();
                    if (ev.type === "on") this.on(ev.event as any, ev.listener.bind(null, this));
                    if (ev.type === "once") this.once(ev.event as any, ev.listener.bind(null, this));
                    delete require.cache[require.resolve(`${path}events/${file}`)];
                }
            res(tsfiles.length);
        })
    }

    async createSettings(): Promise<void> {
        return new Promise(async resolve => {
            if (!(await doesFileExist("./settings.json"))) await writeFile("./settings.json", JSON.stringify({}))
            const buffer = await readFile("./settings.json");
            const json: any = JSON.parse(buffer.toString())
            this.modules.forEach(module => {
                if (json[module.identifier] == undefined && module.getGlobalSettings().size > 0) json[module.identifier] = {};
                module.getGlobalSettings().forEach((value, key) => { if (json[module.identifier][key] == undefined) json[module.identifier][key] = value })
            })
            await writeFile("./settings.json", JSON.stringify(json, null, 2));
            resolve();
        });
    }

    async loadSettings(): Promise<void> {
        return new Promise(async resolve => {
            if (!(await doesFileExist("./settings.json"))) return console.log("Could not load settings file!");
            const buffer = await readFile("./settings.json");
            const json: any = JSON.parse(buffer.toString())
            this.modules.forEach(module => {
                module.getGlobalSettings().forEach((value, key) => {
                    this.settings.set(module.identifier, key, json[module.identifier] !== undefined ? json[module.identifier][key] : value);
                })
            })
            resolve();
        });
    }

    async loadDatabase() {
        return new Promise(resolve => {
            mongoose.connect("mongodb://localhost:27017/boilerbot", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true });
            this.database = mongoose.connection;
            this.database.on("open", () => resolve(console.log("Successfully connected to database")));
        });
    }

    getEventCount = () => this.eventNames().map(f => this.listenerCount(f)).reduce((a, b) => a + b);

    async getGuild(paramGuild: string): Promise<GuildWrapper> {
        return new Promise(async resolve => {
            if (paramGuild === undefined || paramGuild.length <= 0) resolve(await GuildWrapper.getWrapper(""))
            if (!this.wrappedGuilds.has(paramGuild)) this.wrappedGuilds.set(paramGuild, (await GuildWrapper.getWrapper(paramGuild)));
            resolve(this.wrappedGuilds.get(paramGuild));
        });
    }

    async getGuildSettings(paramGuild: string): Promise<Settings> {
        return (await this.getGuild(paramGuild)).settings;
    }

    updateGuildSettings(paramGuild: string, settings: Settings) {
        const wrapper = this.wrappedGuilds.get(paramGuild);
        wrapper.settings = settings;
        this.wrappedGuilds.set(paramGuild, wrapper);
    }

}