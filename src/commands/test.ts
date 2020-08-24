import { WrappedClient } from "../client";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";

export class Test implements Command {
    label = "test";
    description = "A test command for developers";
    category = "Developer";
    defaultLevel = 100;
    allowInDM = true;

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

    }

}