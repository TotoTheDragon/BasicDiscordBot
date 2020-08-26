import { WrappedClient } from "../client";
import { Settings } from "./Settings";
import { getSettings } from "../database/DatabaseUtil";
import "../util/MapUtil";

export class GuildWrapper {

    guild: string
    disabledModules: Set<string>;
    settings: Settings;

    private constructor(paramGuild: string) {
        this.guild = paramGuild;
        this.disabledModules = new Set();
    }

    loadDefaults() {
        if (this.settings === undefined) this.settings = new Settings();
        this.settings.load(WrappedClient.instance.modules.map(value => value.getGuildSettings()));
    }

    static async getWrapper(guild: string): Promise<GuildWrapper> {
        return new Promise(async resolve => {
            const wrapper = new GuildWrapper(guild);
            await wrapper.loadDefaults();
            resolve(wrapper);
        })
    }

    disableModule = (module: string) => this.disabledModules.add(module);
    enableModule = (module: string) => this.disabledModules.delete(module);

}

