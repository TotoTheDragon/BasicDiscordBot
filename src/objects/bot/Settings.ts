export class Settings {

    settings: Map<string, any>;

    constructor() {
        this.settings = new Map();
    }

    load(values: Map<string, any>[], overwrite: boolean = false): Settings {
        values.forEach(map => map.forEach((value, key) => { if (overwrite || !this.settings.has(key)) this.settings.set(key, value) }));
        return this;
    }

    set(setting: string, value: any): Settings {
        this.settings.set(setting, value);
        return this;
    }

    get = (setting: string): any => this.settings.get(setting);

    getFull = (path: string): any => this.settings.get(path);

    toJson = (): object => {
        let output = {};
        this.settings.forEach((v, k) => output[k] = v);
        return output;
    }

}