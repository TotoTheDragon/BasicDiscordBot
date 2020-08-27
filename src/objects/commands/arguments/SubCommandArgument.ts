import { Command } from "../Command";
import { CommandArgument } from "../CommandArgument";

export class SubCommandArgument implements CommandArgument<string> {

    name: string;
    identifier: string;
    description: string;
    required: boolean;

    default?: string;

    commands: Map<string, Command>;

    constructor() {
        this.name = "A subcomand";
        this.identifier = "subcommand";
        this.description = "A subcommand";
        this.commands = new Map();
        this.required = true;
    }

    setDefault = (paramString: string): SubCommandArgument => {
        this.default = paramString;
        return this;
    }

    setName = (paramString: string): SubCommandArgument => {
        this.name = paramString;
        return this;
    }

    setIdentifier = (paramString: string): SubCommandArgument => {
        this.identifier = paramString;
        return this;
    }

    setDescription = (paramString: string): SubCommandArgument => {
        this.description = paramString;
        return this;
    }

    setRequired = (paramBoolean: boolean): SubCommandArgument => {
        this.required = paramBoolean;
        return this;
    }

    addCommand(command: Command): SubCommandArgument {
        this.commands.set(command.label, command);
        if (command.aliases) command.aliases.forEach(alias => this.commands.set(alias, command));
        return this;
    }

    parse = (paramString: string): string => {
        return this.commands.has(paramString.split(" ")[0]) ? paramString.split(" ")[0] : undefined;
    };

    slice = (paramString: string): string => {
        return paramString.split(" ").slice(1).join(" ");
    }



}