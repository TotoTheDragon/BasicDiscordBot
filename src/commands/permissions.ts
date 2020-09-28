import { WrappedClient } from "../client";
import { SubCommandArgument } from "../objects/commands/arguments/SubCommandArgument";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { PermissionsHelp } from "./subcommands/permissions/PermissionsHelp";
import { PermissionsSet } from "./subcommands/permissions/PermissionsSet";


export class Permissions extends Command {
    label = "permissions";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new SubCommandArgument()
            .setIdentifier("permissionssub")
            .setRequired(false)
            .setDefault("help")
            .addCommand(new PermissionsHelp())
            .addCommand(new PermissionsSet())
    ];

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => { }

}