import { WrappedClient } from "../../../client";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { EmbedStyle } from "../../../objects/EmbedStyle";
import { getInfoEmbed } from "../../../util/EmbedUtil";
import { Toggleable } from "../../../objects/Toggleable";

export class ConfigHelp extends Toggleable implements Command {
    label = "help";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new StringArgument().setIdentifier("module").setRequired(false).setLimit(1),
        new StringArgument().setIdentifier("setting").setRequired(false).setLimit(1),
        new StringArgument().setIdentifier("value").setRequired(false).setLimit(1000)
    ]
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const style: EmbedStyle = getInfoEmbed()
            .setTitle("Help for command config")
            .addField("help", "Gives you a list of all subcommands")
            .addField("list", "Gives you a list of all modules that can be configured")
            .addField("info <module>", "Gives you info about a modules configuration")
            .addField("set <module> <setting> <value>", "Sets a value in config")
            .addField("reset <module> [setting]", "Resets a value or module to default");
        return info.guildchannel.send(style.getAsEmbed());

    }

}