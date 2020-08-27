import { Collection } from "discord.js";
import { WrappedClient } from "../../../client";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { EmbedStyle } from "../../../objects/EmbedStyle";
import { IModule } from "../../../objects/modules/IModule";
import { getInfoEmbed } from "../../../util/EmbedUtil";

export class ConfigInfo extends Command {
    label = "info";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new StringArgument().setIdentifier("module").setRequired(true).setLimit(1),
    ]
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {
        const settings = await client.getGuildSettings(info.guild.id);

        const configurableModules: Collection<string, IModule> = client.modules.filter(module => module.getGuildSettings().size > 0);

        const module: IModule = configurableModules.get(mappedArgs.get("module"));

        if (!module) return console.log("No module found");
        const style: EmbedStyle = getInfoEmbed()
            .setTitle(`Configuration info for module __**${module.identifier}**__`)
            .setDescription(module.description)
            .addField("Available settings", Array.from(module.getGuildSettings(false)).map(([key, value]) => key).join(", "));
        return info.guildchannel.send(style.getAsEmbed());
    }

}