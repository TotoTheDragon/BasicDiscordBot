import { CommandArgument } from "../CommandArgument";

export class KeywordArgument implements CommandArgument<string> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    keywords: string[];
    matchcase: boolean;

    constructor() {
        this.name = "A integer";
        this.identifier = "integer";
        this.description = "A integer";
        this.matchcase = true;
        this.required = true;
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

    addKeyword = (paramWord: string): KeywordArgument => {
        this.keywords.push(paramWord);
        return this;
    }

    setMatchCase = (paramBoolean: boolean): KeywordArgument => {
        this.matchcase = paramBoolean;
        return this;
    }

    parse = (paramString: string): string => {
        return this.keywords.find(s =>
            this.matchcase ?
                paramString.startsWith(s) :
                paramString.toLowerCase().startsWith(s.toLowerCase()))
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }
}