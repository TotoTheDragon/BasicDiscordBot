import { CommandArgument } from "../CommandArgument";

export class KeywordArgument implements CommandArgument<string> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    keywords: Map<string, string>;

    matchcase: boolean;

    constructor() {
        this.name = "A integer";
        this.identifier = "integer";
        this.description = "A integer";
        this.matchcase = true;
        this.required = true;
        this.keywords = new Map();
    }

    setName = (paramString: string): KeywordArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): KeywordArgument => {
        this.identifier = paramString;
        return this;
    }


    setDescription = (paramString: string): KeywordArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): KeywordArgument => {
        this.required = paramBoolean;
        return this;
    }

    addKeyword = (paramWord: string, ...aliases: string[]): KeywordArgument => {
        this.keywords.set(paramWord, paramWord);
        for (const alias of aliases) this.keywords.set(alias, paramWord);
        return this;
    }

    setMatchCase = (paramBoolean: boolean): KeywordArgument => {
        this.matchcase = paramBoolean;
        return this;
    }

    parse = (paramString: string): string => {
        const found = Array.from(this.keywords).find(
            ([alias]) => this.matchcase ?
                paramString.startsWith(alias) :
                paramString.toLowerCase().startsWith(alias.toLowerCase()));
        return found === undefined ? undefined : found[1];
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }
}