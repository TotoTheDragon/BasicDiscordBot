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

    parse = (paramString: string): Role => {
        let targetId = this.parseId(paramString);
        return WrappedClient.instance.guilds.cache.flatMap(guild => guild.roles.cache).find(role => role.id === targetId);
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }

    parseId = (paramString: string): string => {
        let role = paramString.split(" ")[0];
        return role.startsWith("<&") ? role.slice(2, role.length - 1) : role;
    };
}