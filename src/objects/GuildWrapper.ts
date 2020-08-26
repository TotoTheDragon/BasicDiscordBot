import { WrappedClient } from "../client";
import { Settings } from "./Settings";
import { getSettings } from "../database/DatabaseUtil";
import "../util/MapUtil";

export class GuildWrapper {

    guild: string
    settings: Settings;

    private constructor(paramGuild: string) {
        this.guild = paramGuild;
    }

    loadDefaults() {
        if (this.settings === undefined) this.settings = new Settings();
        this.settings.load(WrappedClient.instance.modules.map(value => value.getGuildSettings()));
    }

    async loadFromDatabase(): Promise<void> {
        return new Promise(async resolve => {
            this.settings = (await getSettings(this.guild));
            resolve();
        })
    }

    async saveToDatabase(): Promise<any> {
        return new Promise(resolve => {
            resolve();
        })
    }

    static async getWrapper(guild: string): Promise<GuildWrapper> {
        return new Promise(async resolve => {
            const wrapper = new GuildWrapper(guild);
            //await wrapper.loadFromDatabase();
            await wrapper.loadDefaults();
            //await wrapper.saveToDatabase();
            resolve(wrapper);
        })

    }

}

