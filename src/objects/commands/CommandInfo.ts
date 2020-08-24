import { Message, TextChannel, NewsChannel, DMChannel, User, GuildMember, Guild } from "discord.js";
import { WrappedMessage } from "../WrappedMessage";

export class CommandInfo {
    message: WrappedMessage;
    channel: TextChannel | NewsChannel | DMChannel;
    user: User;

    isDM: boolean;
    hasGuild: boolean;

    guild: Guild;
    member: GuildMember;
    guildchannel: TextChannel | NewsChannel;
    dmchannel: DMChannel;

    constructor(paramMessage: WrappedMessage) {
        this.message = paramMessage;
        this.channel = paramMessage.channel;
        this.user = this.message.author;

        this.isDM = this.channel.type == "dm";
        this.hasGuild = this.message.guild != null;

        this.dmchannel = this.isDM ? paramMessage.channel as DMChannel : undefined;
        this.guild = this.hasGuild ? this.message.guild : undefined;
        this.guildchannel = this.hasGuild ? paramMessage.channel as TextChannel | NewsChannel : undefined;
        this.member = this.hasGuild ? this.message.guild.member(this.user) : undefined;
    }
}