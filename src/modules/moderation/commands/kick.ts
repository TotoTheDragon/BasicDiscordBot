import { Command } from "../../../objects/commands/Command";
import { UserArgument } from "../../../objects/commands/arguments/UserArgument";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { WrappedClient } from "../../../client";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { User, GuildMember, Message, MessageEmbed } from "discord.js";

export class Kick extends Command {
    label = "kick";
    description = "Used to kick users";
    category = "Moderation";
    defaultLevel = 100;
    allowInDM = false;
    arguments =
        [
            new UserArgument().setName("target").setIdentifier("target").setRequired(true),
            new StringArgument().setName("reason").setIdentifier("reason").setRequired(false).setLimit(100)
        ];

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const target: User = mappedArgs.get("target");
        const targetMember: GuildMember = info.guild.member(target);

        if (!info.member.hasPermission("KICK_MEMBERS")) {
            let errorMessage: Message = await info.guildchannel.send("You do not have sufficient permissions to kick this player");
            return errorMessage.delete({ timeout: 5000 });
        }

        if (!targetMember.kickable) {
            let errorMessage: Message = await info.guildchannel.send("The bot does not have have sufficient permission to kick the player");
            return errorMessage.delete({ timeout: 5000 });
        }

        await info.guildchannel.send(
            new MessageEmbed()
                .setTitle("Player kicked")
                .setThumbnail(target.avatarURL())
                .setDescription(`A player was kicked from the discord`)
                .setColor("#ff0000")
                .addField("Executor", `<@${info.user.id}>`, true)
                .addField("Target", `<@${target.id}>`, true)
                .addField("_ _", "_ _", true)
                .addField("Reason", mappedArgs.get("reason") || "No reason given")
                .setTimestamp()
                .setFooter(WrappedClient.instance.settings.get("bot", "footer"), WrappedClient.instance.settings.get("bot", "footer-url"))
        );

        await targetMember.kick(mappedArgs.get("reason") || "No reason given");
    }

}