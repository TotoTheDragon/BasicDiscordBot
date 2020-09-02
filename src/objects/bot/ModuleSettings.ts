import { Settings } from "./Settings";

export class ModuleSettings {

    modules: Map<string, Settings>;

    constructor() {
        this.modules = new Map();
    }

    set(module: string, setting: string, value: any): ModuleSettings {
        this.getModule(module).set(setting, value);
        return this;
    }

    getModule(module: string): Settings {
        if (!this.modules.has(module)) this.modules.set(module, new Settings());
        return this.modules.get(module);
    }

    get = (module: string, setting: string): any => {
        return this.getModule(module).get(setting);
    }

    load(module: string, data: Map<string, any>[], overwrite?: boolean): ModuleSettings {
        const mod: Settings = this.getModule(module).load(data, overwrite);
        return this;
    }
}