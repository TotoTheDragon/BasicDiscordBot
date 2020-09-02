import { Message, MessageEmbed } from "discord.js";
import { WrappedClient } from "../client";
import { StringArgument } from "../objects/commands/arguments/StringArgument";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { Pair } from "../objects/Pair";

export class Reload extends Command {
    label = "reload";
    description = "This is a command for the developer to reload commands/events";
    category = "Developer";
    defaultLevel = 100;
    allowInDM = true;

    arguments = [
        new StringArgument().setIdentifier("type").setName("type").setRequired(false).setLimit(1)
    ]

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        let type: string = mappedArgs.get("type") ? mappedArgs.get("type").toLowerCase() : undefined;

        let reloadCommands: boolean = type ? ["cmd", "command", "commands"].includes(type) : true;
        let reloadEvents: boolean = type ? ["event", "events"].includes(type) : true;

        const reloaded: Pair<number, number> = await client.loadAllModules(reloadCommands, reloadEvents);

        let embedMessage: Message = await info.channel.send(
            new MessageEmbed()
                .setTitle("Reload succesful")
                .setColor("#00ff00")
                .setDescription("Succesfully reloaded bot!")
                .addField("Commands", reloaded.first || "N/A", true)
                .addField("Events", reloaded.second || "N/A", true)
                .setFooter(client.settings.get("bot", "footer"), client.settings.get("bot", "footer-url"))
                .setTimestamp()
        );
        embedMessage.delete({ timeout: 5000 });
    }
}