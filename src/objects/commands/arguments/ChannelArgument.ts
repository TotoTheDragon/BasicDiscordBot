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

    parse = (paramString: string): TextChannel | NewsChannel | DMChannel => {
        let targetId = this.parseId(paramString);
        return WrappedClient.instance.channels.cache.find(channel => channel.id === targetId) as TextChannel | NewsChannel | DMChannel;
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }

    parseId = (paramString: string): string => {
        let channel = paramString.split(" ")[0];
        return channel.startsWith("<#") ? channel.slice(2, channel.length - 1) : channel;
    };
}