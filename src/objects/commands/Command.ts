import { WrappedClient } from "../../client";
import { CommandArgument } from "./CommandArgument";
import { CommandInfo } from "./CommandInfo";
import { Toggleable } from "../Toggleable";

export abstract class Command extends Toggleable {
    abstract label: string;
    abstract description: string;
    module?: string;
    abstract category: string;
    abstract defaultLevel: number;
    abstract allowInDM: boolean;
    aliases?: string[];
    arguments?: CommandArgument<any>[];
    abstract run: (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => void;
}