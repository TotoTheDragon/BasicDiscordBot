import { CommandArgument } from "../CommandArgument";
import { parseTimeToSeconds } from "../../../util/TimeUtil";

export class TimeArgument implements CommandArgument<number> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    constructor() {
        this.name = "A period of time";
        this.identifier = "time";
        this.description = "This is a period of time.";
        this.required = true;
    }

    setName = (paramString: string): TimeArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): TimeArgument => {
        this.identifier = paramString;
        return this;
    }

    setDescription = (paramString: string): TimeArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): TimeArgument => {
        this.required = paramBoolean;
        return this;
    }

    parse = (paramString: string): number => {
        return parseTimeToSeconds(paramString.split(" ")[0]);
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }
}