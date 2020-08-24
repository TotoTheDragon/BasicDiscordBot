import { WrappedClient } from "../../../client";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { TimeArgument } from "../../../objects/commands/arguments/TimeArgument";
import { UserArgument } from "../../../objects/commands/arguments/UserArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";

export class Mute implements Command {
    label = "mute";
    description = "Used to mute players";
    category = "Moderation";
    defaultLevel = 100;
    allowInDM = false;
    arguments =
        [
            new UserArgument().setName("target").setIdentifier("target").setRequired(true),
            new TimeArgument().setName("duration").setIdentifier("time").setRequired(false),
            new StringArgument().setName("reason").setIdentifier("reason").setRequired(false).setLimit(100)
        ];


    run = (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        // Check if muted role exists

        // Check if bot can create/give muted role

        // Check if executor is allowed to mute target (Permission levels if they are set up, else the discord permissions)

        // Send embeds in log channel and command execution channel

        // Mute target

    }



}