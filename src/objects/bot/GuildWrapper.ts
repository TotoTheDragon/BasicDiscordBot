import { SerializedData, SqlDataBody } from "simpledatabases";
import { WrappedClient } from "../../client";
import "../../util/MapUtil";
import { ModuleSettings } from "./ModuleSettings";
import { Settings } from "./Settings";

export class GuildWrapper implements SqlDataBody {

    id: string
    disabledModules: Set<string>;
    settings: ModuleSettings;

    constructor(paramGuild?: string) {
        this.id = paramGuild;
        this.disabledModules = new Set();
        this.settings = new ModuleSettings();
    }

    loadDefaults(): GuildWrapper {
        if (this.settings === undefined) this.settings = new ModuleSettings();
        WrappedClient.instance.modules.forEach(mod => this.settings.load(mod.identifier, Array.of(mod.getGuildSettings()), false));
        return this;
    }

    disableModule = (module: string) => {
        WrappedClient.instance.modules.get(module).disableGuild(this.id);
        this.disabledModules.add(module);
    }
    enableModule = (module: string) => {
        WrappedClient.instance.modules.get(module).enableGuid(this.id);
        this.disabledModules.delete(module);
    }

    getTable = (): string => "guilds";
    getKey = (): string => this.id;
    getStructure = (): string[] => ["id"].concat(WrappedClient.instance.modules.filter((v, k) => v.isEnabled()).map((k, v) => v));

    remove = (): void => {
        throw new Error("Method not implemented.");
    }
    serialize = (data: SerializedData): void => {
        data.write("id", this.id);
        this.settings.modules.forEach((v, k) => data.write(k, JSON.stringify(v.toJson())));
    }
    deserialize = (data: SerializedData): void => {
        this.id = data.applyAs("id");
        this.loadDefaults();
        for (const mod of Object.keys(data.getAsObject()).filter(v => v !== "id")) {
            if (!this.settings.modules.has(mod)) break;
            let map: Map<string, any> = new Map(Object.entries(JSON.parse(data.applyAs<string>(mod))));
            this.settings.modules.get(mod).load(Array.of(map), true);
        }
    }

}



