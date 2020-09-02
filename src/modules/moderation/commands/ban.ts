import { Command } from "../../../objects/commands/Command";
import { UserArgument } from "../../../objects/commands/arguments/UserArgument";
import { TimeArgument } from "../../../objects/commands/arguments/TimeArgument";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { WrappedClient } from "../../../client";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { User, GuildMember, Message, MessageEmbed } from "discord.js";
import { parseTimeFromXtoY } from "../../../util/TimeUtil";

export class Ban extends Command {
    aliases?: string[];
    label = "ban";
    description = "Used to ban a user";
    category = "Moderation";
    defaultLevel = 100;
    allowInDM = false;
    arguments =
        [
            new UserArgument().setName("target").setIdentifier("target").setRequired(true).setDescription("The user you want to ban"),
            new TimeArgument().setName("duration").setIdentifier("time").setRequired(false).setDescription("The amount of time you want them banned for"),
            new StringArgument().setName("reason").setIdentifier("reason").setRequired(false).setDescription("Why you want to ban them").setLimit(100)
        ];

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const target: User = mappedArgs.get("target");
        const targetMember: GuildMember = info.guild.member(target);

        if (!info.member.hasPermission("BAN_MEMBERS")) {
            let errorMessage: Message = await info.guildchannel.send("You do not have sufficient permissions to ban this player");
            return errorMessage.delete({ timeout: 5000 });
        }

        if (!targetMember.bannable) {
            let errorMessage: Message = await info.guildchannel.send("The bot does not have have sufficient permission to ban the player");
            return errorMessage.delete({ timeout: 5000 });
        }

        await info.guildchannel.send(
            new MessageEmbed()
                .setTitle("Player banned")
                .setThumbnail(target.avatarURL())
                .setDescription(`A player was banned from the discord`)
                .setColor("#ff0000")
                .addField("Executor", `<@${info.user.id}>`, true)
                .addField("Target", `<@${target.id}>`, true)
                .addField("Time", `${mappedArgs.get("time") ? `${parseTimeFromXtoY(mappedArgs.get("time"), "s", "d")} days` : "Forever"}`, true)
                .addField("Reason", mappedArgs.get("reason") || "No reason given")
                .setTimestamp()
                .setFooter(WrappedClient.instance.settings.get("bot", "footer"), WrappedClient.instance.settings.get("bot", "footer-url"))
        );

        await targetMember.ban(
            {
                reason: mappedArgs.get("reason") || "No reason given",
                days: mappedArgs.get("time") ? parseTimeFromXtoY(mappedArgs.get("time"), "s", "d") : undefined
            })
    }

}