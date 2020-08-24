import { ColorResolvable, EmbedFieldData, MessageEmbed } from "discord.js";

export class EmbedStyle {

    title: string;
    titlePrefix: string;
    color: ColorResolvable;
    description: string;

    thumbnail: string;
    image: string;

    timestamp: number | Date;
    fields: EmbedFieldData[];
    footer: string;
    footerurl: string;

    constructor() {
        this.fields = [];
    }

    setTitle(paramString: string, prefix?: string): EmbedStyle {
        this.title = paramString;
        if (prefix) this.titlePrefix = prefix;
        return this;
    }

    setColor(paramColor: ColorResolvable): EmbedStyle {
        this.color = paramColor;
        return this;
    }

    setDescription(paramString: string): EmbedStyle {
        this.description = paramString;
        return this;
    }

    setThumbnail(paramString: string): EmbedStyle {
        this.thumbnail = paramString;
        return this;
    }

    setImage(paramString: string): EmbedStyle {
        this.image = paramString;
        return this;
    }

    setTimestamp(paramTime?: number | Date): EmbedStyle {
        this.timestamp = paramTime;
        return this;
    }

    setFooter(paramString: string, paramUrl?: string): EmbedStyle {
        this.footer = paramString;
        this.footerurl = paramUrl;
        return this;
    }

    addField(paramName: string, paramValue: string, inline?: true): EmbedStyle {
        this.fields.push({ name: paramName, value: paramValue, inline: inline });
        return this;
    }

    getAsEmbed(): MessageEmbed {
        const embed = new MessageEmbed();
        if (this.title || this.titlePrefix) embed.setTitle(`${this.titlePrefix || ""}${this.title || ""}`);
        if (this.color) embed.setColor(this.color);
        if (this.description) embed.setDescription(this.description);
        if (this.thumbnail) embed.setThumbnail(this.thumbnail);
        if (this.image) embed.setImage(this.image);
        if (this.footer || this.footerurl) embed.setFooter(this.footer, this.footerurl);
        if (this.timestamp) embed.setTimestamp(this.timestamp);
        if (this.fields.length > 0) embed.addFields(this.fields);
        return embed;
    }

}