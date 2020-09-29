import { Guild, PermissionResolvable, User } from "discord.js";
import { WrappedClient } from "../client";
import { CommandInfo } from "../objects/commands/CommandInfo";

export function getPermissionLevel(info: CommandInfo): number {
    //if ((WrappedClient.instance.settings.get("bot", "bot-owners") as Array<string>).includes(info.user.id)) return 1010; // Bot owner

    /*
        Ability to add different types of support members here
    */

    if (info.guild.ownerID === info.user.id) return 1000; // Guild owner

    /*
        Check for roles, discord permissions (and user based permissions which will be added later)
    */

    let level = 0;

    if (info.message.guildWrapper.data.has("bot", "role-permissions")) {
        let roles = JSON.parse(info.message.guildWrapper.data.get("bot", "role-permissions"));
        Object.entries(roles).forEach(([k, v]) => { if (info.member.roles.cache.has(k)) level = Math.max(level, v as number) });
    }

    let discordPermissions = info.message.guildWrapper.data.has("bot", "discord-permissions") ? JSON.parse(info.message.guildWrapper.data.get("bot", "discord-permissions")) : { "ADMINISTRATOR": 999 };
    Object.entries(discordPermissions).forEach(([k, v]) => { if (info.member.hasPermission(k as PermissionResolvable)) level = Math.max(level, v as number) });

    return level;
}