import { WrappedClient } from "../client";
import { StringArgument } from "../objects/commands/arguments/StringArgument";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { IModule } from "../objects/modules/IModule";
import { getErrorEmbed, getInfoEmbed } from "../util/EmbedUtil";

export class Modules extends Command {
    label = "modules";
    description = "Manage the modules in the bot";
    category = "Developer";
    defaultLevel = 100;
    allowInDM = true;
    aliases = ["module"];
    arguments = [
        new StringArgument().setIdentifier("sub1").setRequired(false).setLimit(1),
        new StringArgument().setIdentifier("arg1").setRequired(false).setLimit(1)
    ];
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {
        const sub1: string = (mappedArgs.get("sub1") || "list").toLowerCase();
        if (sub1 === "list") {
            const embed = getInfoEmbed()
                .setTitle("Modules installed");
            client.modules.forEach(module => embed.addField(`${module.name} (${module.identifier})`, module.description));
            info.channel.send(embed.getAsEmbed());
        } else if (sub1 === "info") {

            const arg: string = mappedArgs.get("arg1");
            if (!arg) return info.channel.send(getErrorEmbed().setTitle("Missing argument"))

            const module: IModule = client.modules.get(arg.toLowerCase());
            if (!module) return info.channel.send(getErrorEmbed().setTitle("Could not find this module"))


            const embed = getInfoEmbed()
                .setTitle(`Info for installed module __**${module.identifier}**__`)
                .setDescription(module.description)
                .addField("Name", module.name, true)
                .addField("Version", module.version, true)
                .addField("_ _", "_ _", true)
                .addField("Commands loaded", module.commands ? module.commands.toString() : "N/A", true)
                .addField("Events loaded", module.events ? module.events.toString() : "N/A", true)
                .addField("_ _", "_ _", true)
                .addField("Commands", client.commands.map(value => value).filter(cmd => cmd.module == module.identifier).map(cmd => cmd.label).join(", "))
            info.channel.send(embed.getAsEmbed());

        } else if (sub1 === "setup") {
            console.log("Executed setup command");
        } else {
            console.log("Wrong thingy");
        }
    }

}