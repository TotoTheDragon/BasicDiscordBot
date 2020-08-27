import { Message } from "discord.js";
import { WrappedClient } from "../client";
import { StringArgument } from "../objects/commands/arguments/StringArgument";
import { Command } from "../objects/commands/Command";
import { WrappedMessage } from "../objects/bot/WrappedMessage";
import { getInfoEmbed, getErrorEmbed } from "../util/EmbedUtil";
import { utils } from "../util/EmojiUtil";
import { CommandInfo } from "../objects/commands/CommandInfo";


export class Help extends Command {
    label = "help";
    description = "This will help you with finding command usages";
    category = "Other";
    defaultLevel = 0;
    allowInDM = true;
    arguments = [
        new StringArgument().setName("command").setIdentifier("cmd").setRequired(false).setLimit(1)
    ]

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const cmd: string = mappedArgs.get("cmd");

        if (cmd) return await sendCommandHelpEmbed(client, info.message, cmd);

        return await sendHelpEmbed(client, info.message);

    }
}

async function sendHelpEmbed(client: WrappedClient, message: WrappedMessage): Promise<Message> {

    const style = getInfoEmbed()
        .setTitle(`Help`, `${utils.get("book")} `);

    new Set(client.commands.map(cmd => cmd.category))
        .forEach(category => {
            const commands = client.commands.filter(cmd => cmd.category == category);
            style.addField(`**${category} Commands - [${commands.size}]**`, `${commands.map(cmd => `\`\`${cmd.label}\`\``).join(", ")}`)
        });

    message.channel.send(style.getAsEmbed());

    return;
}

async function sendCommandHelpEmbed(client: WrappedClient, message: WrappedMessage, command: string): Promise<Message> {

    const cmd = client.commands.get(command) || client.aliases.get(command);

    if (!cmd) {
        return message.channel.send(
            getErrorEmbed()
                .setTitle(`Unknown command`)
                .setDescription(`We were unable to find the command **${command}**. Make sure to check spelling!`)
                .getAsEmbed()
        );
    }

    message.channel.send(
        getInfoEmbed()
            .setTitle(`Help for command __**${cmd.label}**__`, `${utils.get("book")} `)
            .setDescription(`
            **< >** - The argument is required
            **[ ]** - The argument is optional
            `)
            .addField("Description", cmd.description, true)
            .addField("Category", cmd.category, true)
            .addField("Level", "WIP disabled", true)
            //.addField("Level", message.settings.cmdLevels.get(cmd.label).toString(), true)
            .addField("Usage", `\`\`${message.settings.get("bot", "prefix")}${cmd.label} ${cmd.arguments ? cmd.arguments.map(arg => arg.required ? `<${arg.name}>` : `[${arg.name}]`).join(" ") : ""}\`\``)
            .addField("Arguments", `${cmd.arguments ? cmd.arguments.map(arg => arg.required ? `**<${arg.name}>** - ${arg.description}` : `**[${arg.name}]** - ${arg.description}`).join("\n") : ""}`)
            .addField("Aliases", `${cmd.aliases ? cmd.aliases.join(", ") : "N/A"}`)
            .getAsEmbed()
    );

    return;
}