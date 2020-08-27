import { WrappedClient } from "../client";
import { SubCommandArgument } from "../objects/commands/arguments/SubCommandArgument";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { ConfigHelp } from "./subcommands/config/ConfigHelp";
import { ConfigInfo } from "./subcommands/config/ConfigInfo";
import { ConfigList } from "./subcommands/config/ConfigList";
import { ConfigReset } from "./subcommands/config/ConfigReset";
import { ConfigSet } from "./subcommands/config/ConfigSet";

export class Config extends Command {
    label = "config";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new SubCommandArgument()
            .setIdentifier("configsub")
            .setRequired(false)
            .setDefault("help")
            .addCommand(new ConfigHelp())
            .addCommand(new ConfigList())
            .addCommand(new ConfigInfo())
            .addCommand(new ConfigReset())
            .addCommand(new ConfigSet())
    ];

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => { }

}