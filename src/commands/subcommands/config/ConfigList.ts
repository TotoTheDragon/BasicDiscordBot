import { Collection } from "discord.js";
import { Command } from "../../../objects/commands/Command";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { WrappedClient } from "../../../client";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { IModule } from "../../../objects/modules/IModule";
import { EmbedStyle } from "../../../objects/EmbedStyle";
import { getInfoEmbed } from "../../../util/EmbedUtil";

export class ConfigList implements Command {
    label = "list";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new StringArgument().setIdentifier("module").setRequired(false).setLimit(1),
        new StringArgument().setIdentifier("setting").setRequired(false).setLimit(1),
        new StringArgument().setIdentifier("value").setRequired(false).setLimit(1000)
    ]
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const configurableModules: Collection<string, IModule> = client.modules.filter(module => module.getGuildSettings().size > 0);

        const style: EmbedStyle = getInfoEmbed()
            .setTitle("Configurable Modules")
            .setDescription(`You have a total of ${client.modules.size} modules installed. A total of ${configurableModules.size} modules can be configured.`)
            .addField("Configurable modules", `${configurableModules.map(module => module.identifier).join(", ")}`);
        return info.guildchannel.send(style.getAsEmbed());

    }

}