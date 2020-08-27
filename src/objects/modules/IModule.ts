import { CommandInfo } from "../commands/CommandInfo";
import { IConfiguration } from "./IConfiguration";
import { Toggleable } from "../Toggleable";

export abstract class IModule extends Toggleable {

    /*
        Info about the module
    */
    name: string;
    identifier: string;
    version: string;

    /*
        Additional info
    */
    description: string;
    dependencies: string[];
    configuration: IConfiguration;
    /* 
        Setups
    */

    botSetupEnabled: boolean = false;
    guildSetupEnabled: boolean = false;

    wasSetup: boolean = !this.botSetupEnabled;
    guildSetups: Set<string> = new Set();

    executeBotSetup(info: CommandInfo) {
        this.wasSetup = true;
    }

    executeGuildSetup(info: CommandInfo) {
        this.guildSetups.add(info.guild.id);
    }

    /*
        Information about loading
    */

    wasLoaded: boolean = false;
    commands: number = 0;
    events: number = 0;

    getGuildSettings(prefixed: boolean = true): Map<string, any> {
        if (prefixed) return (this.configuration !== undefined && this.configuration.guildSettings !== undefined) ? this.configuration.guildSettings.mapKeys((value, key) => `${this.identifier}_${key}`) : new Map();
        return (this.configuration !== undefined && this.configuration.guildSettings !== undefined) ? this.configuration.guildSettings : new Map();
    }

    getGlobalSettings(prefixed: boolean = false): Map<string, any> {
        if (prefixed) return (this.configuration !== undefined && this.configuration.globalSettings !== undefined) ? this.configuration.globalSettings.mapKeys((value, key) => `${this.identifier}_${key}`) : new Map();
        return (this.configuration !== undefined && this.configuration.globalSettings !== undefined) ? this.configuration.globalSettings : new Map();
    }

}