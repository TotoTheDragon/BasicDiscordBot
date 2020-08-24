import { CommandArgument } from "../CommandArgument";

export class IntegerArgument implements CommandArgument {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    constructor() {
        this.name = "A integer";
        this.identifier = "integer";
        this.description = "A integer";
        this.required = true;
    }

    setName = (paramString: string): IntegerArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): IntegerArgument => {
        this.identifier = paramString;
        return this;
    }


    setDescription = (paramString: string): IntegerArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): IntegerArgument => {
        this.required = paramBoolean;
        return this;
    }

    parse = (paramString: string): number => {
        const number = parseInt(paramString.split(" ")[0])
        return number == NaN ? undefined : number;
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }
}