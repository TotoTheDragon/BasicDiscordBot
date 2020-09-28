import { Message } from "discord.js";
import { WrappedClient } from "../client";
import { ModuleSettings } from "../objects/bot/ModuleSettings";
import { WrappedMessage } from "../objects/bot/WrappedMessage";
import { SubCommandArgument } from "../objects/commands/arguments/SubCommandArgument";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { EmbedStyle } from "../objects/EmbedStyle";
import { Event } from "../objects/Event";
import { getErrorEmbed, getNoPermissionEmbed } from "../util/EmbedUtil";

export class CommandHandler implements Event {
    event = "message";
    type = "on";
    listener = async (client: WrappedClient, message: Message) => {

        if (message.author.bot) return;

        let wrappedMessage: WrappedMessage = message as WrappedMessage;
        let guildSettings: ModuleSettings = message.channel.type == "dm" ? await client.getGuildSettings("0") : await client.getGuildSettings(message.guild.id); // Get settings for the guild

        wrappedMessage.settings = guildSettings;
        const cmdInfo: CommandInfo = new CommandInfo(wrappedMessage);
        wrappedMessage.info = cmdInfo;

        if (!(message.content.startsWith(guildSettings.get("bot", "prefix")) || (message.mentions.users.find(u => u.id == client.user.id)))) return; // Ignore messages that do not have prefix
        let sliceLength = message.content.startsWith(guildSettings.get("bot", "prefix")) ? guildSettings.get("bot", "prefix").length : client.user.id.length + 4; // Get amount of characters before command

        const args: string[] = message.content.slice(sliceLength).trim().split(" ");
        const command: string = args.shift().toLowerCase();
        if (client.commands.has(command) || client.aliases.has(command)) {  // Check if command exists
            const cmd = (client.commands.get(command) || client.aliases.get(command));
            const module = client.modules.get(cmd.module);
            if (!module.isEnabled || (!cmdInfo.isDM && !module.isEnabledGuild(cmdInfo.guild.id))) {
                const disabled: EmbedStyle = getErrorEmbed()
                    .setDescription("This module has been disabled");
                return message.channel.send(disabled.getAsEmbed());
            }

            this.runCommand(client, wrappedMessage, cmd, args);
        }
    };

    async runCommand(client: WrappedClient, message: WrappedMessage, cmd: Command, args: string[], argmap?: Map<string, any>) {


        if (message.info.isDM && !cmd.allowInDM) return; // Check if the command is executed in DMs and if that is allowed


        if (!(message.info.member.hasPermission("ADMINISTRATOR") ||
            (cmd.defaultLevel > 0 && !message.info.member.roles.cache.has(message.settings.get("bot", "admin-role"))))
        ) {
            return (await message.channel.send(
                getNoPermissionEmbed()
                    .setTitle("Could not execute command")
                    .setDescription(`You do not have enough permissions to execute this command`)
                    .getAsEmbed()
            )).delete({ timeout: 5000 });
        }

        let [arg, map] = this.parseArguments(cmd, args);
        if (argmap) map = argmap.merge(map);
        args = arg.split(" ");

        const missing = this.checkArguments(cmd, map)
        if (missing) {
            return (await (message.channel.send(
                getErrorEmbed()
                    .setTitle("Could not execute command")
                    .setDescription(`Missing argument **${missing}**`)
                    .getAsEmbed()
            ))).delete({ timeout: 5000 });
        }

        if (cmd.arguments && cmd.arguments.length > 0) {
            const subcmds: SubCommandArgument[] = cmd.arguments.filter(arg => arg instanceof SubCommandArgument).map(arg => arg as SubCommandArgument);
            if (subcmds && subcmds.length > 0) {
                const subCom = subcmds[0].commands.get(map.get(subcmds[0].identifier));
                return this.runCommand(client, message, subCom, args, map);
            }
        }

        cmd.run(client, message.info, args, map);
    }

    parseArguments(command: Command, input: string[]): [string, Map<string, any>] {
        const argmap: Map<string, any> = new Map();
        let str = input.join(" ");
        if (command.arguments) {
            for (let i = 0; i < command.arguments.length; i++) {
                const current = command.arguments[i];
                const val = current.parse(str.trimStart());

                if (val !== undefined) str = current.slice(str.trimStart());

                if (!(current.required && !current.default && (val === undefined))) {
                    argmap.set(current.identifier, val === undefined ? current.default : val);
                    if (current instanceof SubCommandArgument) return [str, argmap];
                }
            }
        }
        return [str, argmap];
    }

    checkArguments(command: Command, argmap: Map<string, any>): string {
        if (command.arguments) command.arguments.forEach(arg => { if (!argmap.has(arg.identifier)) return arg.identifier });
        return undefined;
    }
}