import { Command } from "../objects/commands/Command";
import { WrappedClient } from "../client";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { StringArgument } from "../objects/commands/arguments/StringArgument";
import { EmbedStyle } from "../objects/EmbedStyle";
import { getInfoEmbed } from "../util/EmbedUtil";
import { IModule } from "../objects/modules/IModule";
import { Collection } from "discord.js";

export class Config implements Command {
    label = "config";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new StringArgument().setIdentifier("subcommand").setRequired(false).setDefault("help").setLimit(1),
        new StringArgument().setIdentifier("module").setRequired(false).setLimit(1),
        new StringArgument().setIdentifier("setting").setRequired(false).setLimit(1),
        new StringArgument().setIdentifier("value").setRequired(false).setLimit(1000)
    ]
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const settings = await client.getGuildSettings(info.guild.id);

        const subcommand: string = (mappedArgs.get("subcommand") as string).toLowerCase();
        const configurableModules: Collection<string, IModule> = client.modules.filter(module => module.getGuildSettings().size > 0);

        const module: IModule = configurableModules.get(mappedArgs.get("module"));

        if (subcommand === "help") {
            const style: EmbedStyle = getInfoEmbed()
                .setTitle("Help for command config")
                .addField("help", "Gives you a list of all subcommands")
                .addField("list", "Gives you a list of all modules that can be configured")
                .addField("info <module>", "Gives you info about a modules configuration")
                .addField("set <module> <setting> <value>", "Sets a value in config")
                .addField("reset <module> [setting]", "Resets a value or module to default");
            return info.guildchannel.send(style.getAsEmbed());
        } else if (subcommand === "list") {
            const style: EmbedStyle = getInfoEmbed()
                .setTitle("Configurable Modules")
                .setDescription(`You have a total of ${client.modules.size} modules installed. A total of ${configurableModules.size} modules can be configured.`)
                .addField("Configurable modules", `${configurableModules.map(module => module.identifier).join(", ")}`);
            return info.guildchannel.send(style.getAsEmbed());
        } else if (subcommand === "info") {
            if (!module) return console.log("No module found");
            const style: EmbedStyle = getInfoEmbed()
                .setTitle(`Configuration info for module __**${module.identifier}**__`)
                .setDescription(module.description)
                .addField("Available settings", Array.from(module.getGuildSettings(false)).map(([key, value]) => key).join(", "));
            return info.guildchannel.send(style.getAsEmbed());
        } else if (subcommand === "set") {
            if (!module) return console.log("No module found");
            if (!mappedArgs.get("setting") || !module.getGuildSettings(false).has(mappedArgs.get("setting"))) return console.log("Could not find the setting");
            if (!mappedArgs.get("value")) return console.log("No value found");
            settings.set(module.identifier, mappedArgs.get("setting"), mappedArgs.get("value"));
            client.updateGuildSettings(info.guild.id, settings);
            const style = getInfoEmbed()
                .setTitle("Changed configuration")
                .setDescription(`Changed setting **${mappedArgs.get("setting")}** for module **${module.identifier}** to ${mappedArgs.get("value")}`)
            return info.guildchannel.send(style.getAsEmbed());
        } else if (subcommand === "reset") {
            if (!module) return console.log("No module found");
            if (!mappedArgs.get("setting")) settings.load(Array.of(module.getGuildSettings(true)), true);
            else settings.set(module.identifier, mappedArgs.get("setting"), module.getGuildSettings(false).get(mappedArgs.get("setting")));
            client.updateGuildSettings(info.guild.id, settings);
            const style = getInfoEmbed()
                .setTitle("Changed configuration")
                .setDescription(`Reset setting(s) for module **${module.identifier}**`)
            return info.guildchannel.send(style.getAsEmbed());
        }
    }

}