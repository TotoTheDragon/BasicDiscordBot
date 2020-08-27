import { IConfiguration } from "../../objects/modules/IConfiguration";
import { ChannelArgument } from "../../objects/commands/arguments/ChannelArgument";

export class Configuration implements IConfiguration {

    globalParse: Map<string, (input: string) => any> = new Map();

    guildParse: Map<string, (input: string) => any> = new Map()
        .set("log-channel", new ChannelArgument().parseId);

    globalSettings = new Map();

    guildSettings = new Map()
        .set("log-channel", "0");

}