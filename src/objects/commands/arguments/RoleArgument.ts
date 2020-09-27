import { CommandArgument } from "../CommandArgument";
import { WrappedClient } from "../../../client";
import { User, TextChannel, NewsChannel, DMChannel, Role } from "discord.js";

export class RoleArgument implements CommandArgument<Role> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    constructor() {
        this.name = "A role";
        this.identifier = "role";
        this.description = "A role";
        this.required = true;
    }

    setName = (paramString: string): RoleArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): RoleArgument => {
        this.identifier = paramString;
        return this;
    }

    setDescription = (paramString: string): RoleArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): RoleArgument => {
        this.required = paramBoolean;
        return this;
    }

    parse = (paramString: string, guild?: string): Role => {
        let targetId = this.parseId(paramString);
        let role = WrappedClient.instance.guilds.cache.find(g => g.id == guild).roles.cache.find(role => role.id == targetId);
        if (role === undefined && guild) role = WrappedClient.instance.guilds.cache.find(g => g.id == guild).roles.cache.find(role => role.name.toLowerCase() == paramString.toLowerCase());
        return role as Role;
    };

    parseId = (paramString: string): string => {
        let role = paramString.split(" ")[0];
        return role.startsWith("<@&") ? role.slice(3, role.length - 1) : role.startsWith("<&") ? role.slice(2, role.length - 1) : role;
    };

    parseToId = (paramString: string, guild?: string): string => {
        const channel = this.parse(paramString, guild);
        return channel === undefined ? undefined : channel.id;
    }

    parseToTag = (paramString: string, guild?: string): string => {
        const id = this.parseToId(paramString, guild);
        return id === undefined ? undefined : `<@&${id}>`;
    }


    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }
}