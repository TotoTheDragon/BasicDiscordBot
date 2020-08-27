import { Message } from "discord.js";
import { WrappedClient } from "../client";
import { SubCommandArgument } from "../objects/commands/arguments/SubCommandArgument";
import { Command } from "../objects/commands/Command";
import { CommandInfo } from "../objects/commands/CommandInfo";
import { Event } from "../objects/Event";
import { Settings } from "../objects/Settings";
import { WrappedMessage } from "../objects/WrappedMessage";
import { getErrorEmbed } from "../util/EmbedUtil";

export class CommandHandler implements Event {
    event = "message";
    type = "on";
    listener = async (client: WrappedClient, message: Message) => {

        if (message.author.bot) return;

        let wrappedMessage: WrappedMessage = message as WrappedMessage;
        let guildSettings: Settings = await client.getGuildSettings(message.guild?.id); // Get settings for the guild

        wrappedMessage.settings = guildSettings;
        const cmdInfo: CommandInfo = new CommandInfo(wrappedMessage);
        wrappedMessage.info = cmdInfo;

        if (!(message.content.startsWith(guildSettings.get("bot", "prefix")) || (message.mentions.users.find(u => u.id == client.user.id)))) return; // Ignore messages that do not have prefix
        let sliceLength = message.content.startsWith(guildSettings.get("bot", "prefix")) ? guildSettings.get("bot", "prefix").length : client.user.id.length + 4; // Get amount of characters before command

        const args: string[] = message.content.slice(sliceLength).trim().split(" ");
        const command: string = args.shift();
        if (client.commands.has(command) || client.aliases.has(command))  // Check if command exists
            this.runCommand(client, wrappedMessage, (client.commands.get(command) || client.aliases.get(command)), args);
    };

    async runCommand(client: WrappedClient, message: WrappedMessage, cmd: Command, args: string[], argmap?: Map<string, any>) {
        if (message.info.isDM && !cmd.allowInDM) return; // Check if the command is executed in DMs and if that is allowed

        /*
        if ((guildSettings.cmdLevels.get(cmd.label) ? guildSettings.cmdLevels.get(cmd.label) : cmd.defaultLevel) > getUserLevel(cmdInfo)) {
            return (await message.channel.send(
                getNoPermissionEmbed()
                    .setTitle("Could not execute command")
                    .setDescription(`You do not have enough permissions to execute this command`)
                    .getAsEmbed()
            )).delete({ timeout: 5000 });
        }
        */
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

                if (val) str = current.slice(str.trimStart());

                if (!(current.required && !current.default && !val)) {
                    argmap.set(current.identifier, val || current.default);
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
