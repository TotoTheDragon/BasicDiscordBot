import { MessageEmbed } from "discord.js";
import { EmbedStyle } from "../../objects/EmbedStyle";
import { escapeRegex } from "../../util/OtherUtil";

export class Question {

    identifier: number;

    content: string;
    style: EmbedStyle;

    question: string;
    embed: boolean;

    parse: (answer: string) => any;

    constructor(id: number, question: string, parse: (answer: string) => any, style?: EmbedStyle, message?: string) {
        this.identifier = id;
        this.question = question;
        this.content = message;
        this.parse = parse;
        this.style = style;
        this.embed = style !== undefined;
    }

    getIdentifier(): number {
        return this.identifier;
    }

    getQuestion(): string {
        return this.question;
    }

    getMessage(): string | MessageEmbed {
        if (this.embed) return this.style.parse("%question%", this.question).getAsEmbed();
        return this.content.replace(new RegExp(escapeRegex("%question%"), "g"), this.question);
    }

}