import { WrappedClient } from "../../client";
import "../../util/MapUtil";
import { Settings } from "./Settings";

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

    disableModule = (module: string) => {
        WrappedClient.instance.modules.get(module).disableGuild(this.guild);
        this.disabledModules.add(module);
    }
    enableModule = (module: string) => {
        WrappedClient.instance.modules.get(module).enableGuid(this.guild);
        this.disabledModules.delete(module);
    }

}

