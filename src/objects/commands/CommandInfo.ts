import { DMChannel, Guild, GuildMember, NewsChannel, TextChannel, User } from "discord.js";
import { WrappedClient } from "../../client";
import { getPermissionLevel } from "../../util/PermissionUtil";
import { WrappedMessage } from "../bot/WrappedMessage";

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

    permissionLevel: number;

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

    findChannelById(paramId: string): TextChannel | NewsChannel {
        return this.guild.channels.cache.find(channel => channel.id === paramId) as TextChannel | NewsChannel;
    }

    findUserById(paramId: string): User {
        return WrappedClient.instance.users.cache.find(u => u.id === paramId);
    }

    getPermissionLevel(): number {
        if (this.permissionLevel === undefined) this.permissionLevel = getPermissionLevel(this);
        return this.permissionLevel;
    }

}