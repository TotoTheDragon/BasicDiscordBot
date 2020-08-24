import { Client, Collection } from "discord.js";
import { readdir, stat } from "fs/promises";
import mongoose, { Connection } from "mongoose";
import { updateSettings } from "./database/DatabaseUtil";
import { Command } from "./objects/commands/Command";
import { Event } from "./objects/Event";
import { GuildWrapper } from "./objects/GuildWrapper";
import { findFiles } from "./util/FileUtil";
import { mongourl } from "./config";
import { Pair } from "./objects/Pair";

export class WrappedClient extends Client {

    static instance: WrappedClient = null;

    commands: Collection<string, Command>;
    aliases: Collection<string, Command>;
    wrappedGuilds: Collection<string, GuildWrapper>;

    database: Connection;

    constructor(options?) {
        super(options);
        this.commands = new Collection;
        this.aliases = new Collection;
        this.wrappedGuilds = new Collection;
        this.initialize();
        WrappedClient.instance = this;
    }

    private async initialize(): Promise<void> {
        await this.loadAllModules(true, true);
        this.loadDatabase();
    }

    async loadAllModules(commands: boolean, events: boolean): Promise<Pair<number, number>> {
        if (commands) this.commands.clear();
        if (events) this.removeAllListeners();
        await this.loadModule(commands, events);
        const files = await Promise.all((await readdir("./modules/")).filter(async f => (await stat(`./modules/${f}`)).isDirectory()));
        return new Promise(async resolve => {
            for (let i = 0; i < files.length; i++) {
                await this.loadModule(commands, events, files[i]);
            }
            resolve(new Pair(commands ? this.commands.size : undefined, events ? this.getEventCount() : undefined));
        });

    }

    async loadCommands(folderpath: string): Promise<number> {
        return new Promise(async res => {
            const tsfiles = (await findFiles(`${folderpath}commands`, true)).filter(f => f.endsWith(".ts") || f.endsWith(".js"))
            if (tsfiles.length > 0)
                for (const file of tsfiles) {
                    let props = await import(`${folderpath}commands/${file}`);
                    const com: Command = new props[Object.keys(props)[0]]();
                    this.commands.set(com.label, com);
                    if (com.aliases) com.aliases.forEach(alias => this.aliases.set(alias, com));
                    delete require.cache[require.resolve(`${folderpath}commands/${file}`)];
                }
            res(tsfiles.length);
        })

    }

    async loadEvents(folderpath: string): Promise<number> {
        return new Promise(async res => {
            const tsfiles = (await findFiles(`${folderpath}events/`, true)).filter(f => f.endsWith(".ts") || f.endsWith(".js"))
            if (tsfiles.length > 0)
                for (const file of tsfiles) {
                    const props = await import(`${folderpath}events/${file}`);
                    const ev: Event = new props[Object.keys(props)[0]]();
                    if (ev.type === "on") this.on(ev.event as any, ev.listener.bind(null, this));
                    if (ev.type === "once") this.once(ev.event as any, ev.listener.bind(null, this));
                    delete require.cache[require.resolve(`${folderpath}events/${file}`)];
                }
            res(tsfiles.length);
        })
    }

    async loadModule(commands: boolean, events: boolean, moduleName?: string): Promise<void> {
        const folderPath = moduleName ? `./modules/${moduleName}/` : "./";
        const loadedCmds = commands ? await this.loadCommands(folderPath) : 0;
        const loadedEvents = events ? await this.loadEvents(folderPath) : 0;
        console.log(`Loaded module: ${moduleName || "Main bot"}`)
        console.log(`Loaded ${loadedCmds} commands (Total ${this.commands.size})`);
        console.log(`Loaded ${loadedEvents} events (Total ${this.getEventCount()})`);
        console.log("--------------------");
    }

    loadDatabase() {
        mongoose.connect(mongourl, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true });
        this.database = mongoose.connection;
        this.database.on("open", () => console.log("Opened connection to database"));
    }

    getEventCount(): number {
        return this.eventNames().map(f => this.listenerCount(f)).reduce((a, b) => a + b);
    }

    async getSettings(guild?: string): Promise<GuildWrapper> {
        return new Promise(async resolve => {
            if (!guild || !this.wrappedGuilds.has(guild)) {
                const wrapper: GuildWrapper = await GuildWrapper.getWrapper(guild);
                if (!guild) resolve(wrapper);
                if (!this.wrappedGuilds.has(guild)) this.wrappedGuilds.set(guild, wrapper);
            }
            resolve(this.wrappedGuilds.get(guild));
        });
    }

    setSettings(wrapper: GuildWrapper) {
        wrapper.loadDefaults(); // Make sure there are no undefined settings
        updateSettings(wrapper.guild, wrapper.settings); // Update settings in database to keep them persistent
        this.wrappedGuilds.set(wrapper.guild, wrapper);
    }

}