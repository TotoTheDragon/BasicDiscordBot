import { WrappedClient } from "../../client";
import { CommandArgument } from "./CommandArgument";
import { CommandInfo } from "./CommandInfo";

export interface Command {
    label: string,
    description: string,
    module?: string
    category: string,
    defaultLevel: number,
    allowInDM: boolean;
    aliases?: string[],
    arguments?: CommandArgument[],
    run: (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => void
}