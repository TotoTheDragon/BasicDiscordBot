import { Client } from "discord.js";
import { CommandArgument } from "./CommandArgument";
import { CommandInfo } from "./CommandInfo";

export interface Command {
    label: string,
    description: string,
    category: string,
    defaultLevel: number,
    allowInDM: boolean;
    aliases?: string[],
    arguments?: CommandArgument[],
    run: (client: Client, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => void
}