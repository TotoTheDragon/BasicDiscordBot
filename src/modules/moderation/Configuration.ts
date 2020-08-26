import { IConfiguration } from "../../objects/modules/IConfiguration";

export class Configuration implements IConfiguration {

    globalSettings = new Map();

    guildSettings = new Map();

}