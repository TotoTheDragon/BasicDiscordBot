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
        let targetId = this.parseId(paramString);
        let user = WrappedClient.instance.users.cache.find(u => u.id == targetId);
        if (user === undefined) user = WrappedClient.instance.users.cache.find(u => u.username.toLowerCase() == paramString.toLowerCase());
        return user;
    };

    parseId = (paramString: string): string => {
        let user = paramString.split(" ")[0];
        return user.startsWith("<@!") ? user.slice(3, user.length - 1) : (user.startsWith("<@") ? user.slice(2, user.length - 1) : user);
    };

    parseToId = (paramString: string): string => {
        const user = this.parse(paramString);
        return user === undefined ? undefined : user.id;
    }

    parseToTag = (paramString: string): string => {
        const id = this.parseToId(paramString);
        return id === undefined ? undefined : `<@${id}>`;
    }

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }

}