import { WrappedClient } from "../client";
import { getSettings, updateSettings } from "../database/DatabaseUtil";
import { IGuildSettings } from "../database/schemas/Guild";

export class GuildWrapper {

    guild: string
    settings: IGuildSettings;

    private constructor(paramGuild: string) {
        this.guild = paramGuild;
    }

    loadDefaults() {
        if (!this.settings.prefix) this.settings.prefix = "!";
        WrappedClient.instance.commands.forEach(cmd => this.settings.cmdLevels.set(cmd.label, cmd.defaultLevel));
    }

    async loadFromDatabase(): Promise<void> {
        return new Promise(async resolve => {
            this.settings = await getSettings(this.guild);
            resolve();
        })
    }

    async saveToDatabase(): Promise<any> {
        return new Promise(resolve => {
            resolve(updateSettings(this.guild, this.settings));
        })


    }

    static async getWrapper(guild: string): Promise<GuildWrapper> {
        return new Promise(async resolve => {
            const wrapper = new GuildWrapper(guild);
            await wrapper.loadFromDatabase();
            await wrapper.loadDefaults();
            await wrapper.saveToDatabase();
            resolve(wrapper);
        })

    }

}

