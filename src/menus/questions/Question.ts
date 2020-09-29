import { MessageEmbed } from "discord.js";
import { EmbedStyle } from "../../objects/EmbedStyle";
import { escapeRegex } from "../../util/StringUtil";

export class Question {

    identifier: number;

    content: string;
    style: EmbedStyle;

    question: string;
    embed: boolean;

    parse: (answer: string, ...args: any) => any;
    args: any[];


    constructor(id: number, question: string, parse: (answer: string) => any, style?: EmbedStyle, message?: string, ...args: any) {
        this.identifier = id;
        this.question = question;
        this.content = message;
        this.parse = parse;
        this.args = args;
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