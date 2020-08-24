import { WrappedClient } from "../../../client";
import { IntegerArgument } from "../../../objects/commands/arguments/IntegerArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";

export class Clear implements Command {
    label = "clear";
    description = "Used to clear messages";
    category = "Moderation";
    defaultLevel = 100;
    allowInDM = false;
    aliases = ["purge"];

    arguments = [
        new IntegerArgument().setIdentifier("amount").setName("amount").setRequired(true)
    ];

    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        if (!info.message.deleted) await info.message.delete();

        await info.guildchannel.bulkDelete(mappedArgs.get("amount") as number);

    }

}