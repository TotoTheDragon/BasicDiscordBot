import { CommandArgument } from "../CommandArgument";
import { WrappedClient } from "../../../client";
import { User, TextChannel, NewsChannel, DMChannel } from "discord.js";

export class ChannelArgument implements CommandArgument<TextChannel | NewsChannel | DMChannel> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    constructor() {
        this.name = "A channel";
        this.identifier = "channel";
        this.description = "A channel";
        this.required = true;
    }

    setName = (paramString: string): ChannelArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): ChannelArgument => {
        this.identifier = paramString;
        return this;
    }

    setDescription = (paramString: string): ChannelArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): ChannelArgument => {
        this.required = paramBoolean;
        return this;
    }

    parse = (paramString: string, guild?: string): TextChannel | NewsChannel | DMChannel => {
        let targetId = this.parseId(paramString);
        let channel = WrappedClient.instance.channels.cache.find(channel => channel.id === targetId);
        if (channel === undefined && guild) channel = WrappedClient.instance.guilds.cache.find(g => g.id == guild).channels.cache.find(channel => channel.name.toLowerCase() == paramString.toLowerCase());
        return channel as TextChannel | NewsChannel | DMChannel;
    };

    parseId = (paramString: string): string => {
        let channel = paramString.split(" ")[0];
        return channel.startsWith("<#") ? channel.slice(2, channel.length - 1) : channel;
    };

    parseToId = (paramString: string, guild?: string): string => {
        const channel = this.parse(paramString, guild);
        return channel === undefined ? undefined : channel.id;
    }

    parseToTag = (paramString: string, guild?: string): string => {
        const id = this.parseToId(paramString, guild);
        return id === undefined ? undefined : `<#${id}>`;
    }



    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }
}