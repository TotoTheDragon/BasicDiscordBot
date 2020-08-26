import { CommandArgument } from "../CommandArgument";

export class StringArgument implements CommandArgument<string> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;
    limit: number;
    default: string;

    constructor() {
        this.name = "A string";
        this.identifier = "string";
        this.description = "A string";
        this.required = true;
        this.limit = 1;
    }

    setDefault = (paramString: string): StringArgument => {
        this.default = paramString;
        return this;
    }

    setName = (paramString: string): StringArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): StringArgument => {
        this.identifier = paramString;
        return this;
    }

    setDescription = (paramString: string): StringArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): StringArgument => {
        this.required = paramBoolean;
        return this;
    }

    setLimit = (paramNumber: number): StringArgument => {
        this.limit = paramNumber;
        return this;
    }

    parse = (paramString: string): string => {
        return paramString.split(" ").slice(0, this.limit).join(" ");
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(this.limit).join(" ");
    }
}