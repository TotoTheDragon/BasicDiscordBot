import { WrappedClient } from "../../../client";
import { IntegerArgument } from "../../../objects/commands/arguments/IntegerArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { TextChannel, MessageEmbed } from "discord.js";
import { footer, footerurl } from "../../../config";

export class Clear implements Command {
    label = "clear";
    description = "Used to clear messages";
    category = "Moderation";
    defaultLevel = 100;
    allowInDM = false;
    aliases = ["purge"];

    arguments = [
        new IntegerArgument().setIdentifier("amount").setName("amount").setRequired(true)
    ];

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        if (!info.message.deleted) await info.message.delete();

        const deleted = await info.guildchannel.bulkDelete(mappedArgs.get("amount") as number);

        const logChannel = info.findChannelById(info.message.settings.get("moderation", "log-channel"));

        if (logChannel !== undefined)
            await logChannel.send(
                new MessageEmbed()
                    .setTitle("Cleared messages")
                    .setDescription(`A total of ${deleted.size} messages were deleted from channel <#${info.channel.id}>`)
                    .setColor("#ff0000")
                    .addField("Executor", `<@${info.user.id}>`, true)
                    .setTimestamp()
                    .setFooter(footer, footerurl)
            );
        const msg = await info.guildchannel.send(
            new MessageEmbed()
                .setTitle("Cleared messages")
                .setDescription(`A total of ${deleted.size} messages were deleted from channel <#${info.channel.id}>`)
                .setColor("#ff0000")
                .addField("Executor", `<@${info.user.id}>`, true)
                .setTimestamp()
                .setFooter(footer, footerurl)
        );
        msg.delete({ timeout: 5000 })
    }

}