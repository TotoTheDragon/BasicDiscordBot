export class Settings {

    settings: Map<string, any>;

    constructor() {
        this.settings = new Map();
    }

    load(values: Map<string, any>[], overwrite: boolean = false): Settings {
        values.forEach(map => map.forEach((value, key) => { if (overwrite || !this.settings.has(key)) this.settings.set(key, value) }));
        return this;
    }

    set(module: string, setting: string, value: any): Settings {
        this.settings.set(`${module}_${setting}`, value);
        return this;
    }

    get = (module: string, setting: string): any => this.settings.get(`${module}_${setting}`);

    getFull = (path: string): any => this.settings.get(path);

}