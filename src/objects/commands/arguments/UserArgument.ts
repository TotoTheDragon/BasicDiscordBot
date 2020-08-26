import { CommandArgument } from "../CommandArgument";
import { WrappedClient } from "../../../client";
import { User } from "discord.js";

export class UserArgument implements CommandArgument<User> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    constructor() {
        this.name = "A user";
        this.identifier = "user";
        this.description = "A user";
        this.required = true;
    }

    setName = (paramString: string): UserArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): UserArgument => {
        this.identifier = paramString;
        return this;
    }

    setDescription = (paramString: string): UserArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): UserArgument => {
        this.required = paramBoolean;
        return this;
    }

    parse = (paramString: string): User => {
        let user = paramString.split(" ")[0];
        let targetId = user.startsWith("<@!") ? user.slice(3, user.length - 1) : user;
        return WrappedClient.instance.users.cache.find(u => u.id == targetId);
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }
}