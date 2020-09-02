import { RoleArgument } from "./objects/commands/arguments/RoleArgument";
import { IConfiguration } from "./objects/modules/IConfiguration";

export class Configuration implements IConfiguration {

    globalParse: Map<string, (input: string) => any> = new Map()


    guildParse: Map<string, (input: string) => any> = new Map()
        .set("admin-role", new RoleArgument().parseId);


    globalSettings = new Map()
        .set("token", "PUT YOUR TOKEN HERE")
        .set("footer", "BoilerBot v1.0 by DeveloperDragon")
        .set("footer-url", "https://cdn.discordapp.com/avatars/297362162349768705/dedc6763b9418f0c6d6425cd2222bf09.png?size=256")



    guildSettings = new Map()
        .set("prefix", "!")
        .set("admin-role", "");
}