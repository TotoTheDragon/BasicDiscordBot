import { IConfiguration } from "./objects/modules/IConfiguration";

export class Configuration implements IConfiguration {

    globalParse: Map<string, (input: string) => any> = new Map();

    guildParse: Map<string, (input: string) => any> = new Map();

    globalSettings = new Map()
        .set("token", "PUT YOUR TOKEN HERE");

    guildSettings = new Map()
        .set("prefix", "!");
}