import { Collection } from "discord.js";
import { WrappedClient } from "../../../client";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { IModule } from "../../../objects/modules/IModule";
import { getInfoEmbed } from "../../../util/EmbedUtil";

export class ConfigSet implements Command {
    label = "set";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new StringArgument().setIdentifier("module").setRequired(true).setLimit(1),
        new StringArgument().setIdentifier("setting").setRequired(true).setLimit(1),
        new StringArgument().setIdentifier("value").setRequired(true).setLimit(1000)
    ]
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {


        const settings = await client.getGuildSettings(info.guild.id);

        const configurableModules: Collection<string, IModule> = client.modules.filter(module => module.getGuildSettings().size > 0);

        const module: IModule = configurableModules.get(mappedArgs.get("module"));

        const setting: string = mappedArgs.get("setting");
        const value: string = mappedArgs.get("value");

        if (!module) return console.log("No module found");
        if (!setting || !module.getGuildSettings(false).has(setting)) return console.log("Could not find the setting");
        if (value === undefined || value.length < 0) return console.log("No value found");
        if (module.configuration.guildParse.has(setting))
            settings.set(module.identifier, setting, module.configuration.guildParse.get(setting)(value));
        else settings.set(module.identifier, setting, value);
        client.updateGuildSettings(info.guild.id, settings);

        const style = getInfoEmbed()
            .setTitle("Changed configuration")
            .setDescription(`Changed setting **${mappedArgs.get("setting")}** for module **${module.identifier}** to ${settings.get(module.identifier, setting)} `)
        return info.guildchannel.send(style.getAsEmbed());


    }

}