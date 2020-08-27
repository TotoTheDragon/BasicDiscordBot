import { Collection } from "discord.js";
import { WrappedClient } from "../../../client";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { IModule } from "../../../objects/modules/IModule";
import { getInfoEmbed } from "../../../util/EmbedUtil";

export class ConfigReset extends Command {
    label = "reset";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new StringArgument().setIdentifier("module").setRequired(true).setLimit(1),
        new StringArgument().setIdentifier("setting").setRequired(false).setLimit(1),
    ]
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {


        const settings = await client.getGuildSettings(info.guild.id);

        const configurableModules: Collection<string, IModule> = client.modules.filter(module => module.getGuildSettings().size > 0);

        const module: IModule = configurableModules.get(mappedArgs.get("module"));

        const setting: string = mappedArgs.get("setting");

        if (!module) return console.log("No module found");
        if (!setting) settings.load(Array.of(module.getGuildSettings(true)), true);
        else settings.set(module.identifier, setting, module.getGuildSettings(false).get(setting));
        client.updateGuildSettings(info.guild.id, settings);
        const style = getInfoEmbed()
            .setTitle("Changed configuration")
            .setDescription(`Reset setting(s) for module ** ${module.identifier} ** `)
        return info.guildchannel.send(style.getAsEmbed());

    }

}