import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";


export class Information implements Command {
    label = "information";
    aliases = ["info"];
    description = "This command is used to get information about the bot";
    category = "Other";
    defaultLevel = 0;
    allowInDM = true;

    async run(client: Client, info: CommandInfo, args: string[]) {

        info.channel.send(
            new MessageEmbed()
                .setTitle(`Information for BoilerBot`)
                .setDescription(
                    `
                    BoilerBot is a boilerplate for typescript discord bots. This bot includes
                    a series of commands that are frequent in many bots, furthermore it will
                    provide a framework for developers to make their own commands, menus,
                    pretty embeds and a lot more
                    `)
        );

    }
}