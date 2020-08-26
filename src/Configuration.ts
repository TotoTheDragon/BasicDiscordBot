import { IConfiguration } from "./objects/modules/IConfiguration";

export class Configuration implements IConfiguration {

    globalSettings = new Map()
        .set("token", "PUT YOUR TOKEN HERE");

    guildSettings = new Map()
        .set("prefix", "!");
}