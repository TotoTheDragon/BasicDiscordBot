export interface IConfiguration {

    globalSettings: Map<string, any>;

    guildSettings: Map<string, any>;

    globalParse: Map<string, (input: string) => any>;

    guildParse: Map<string, (input: string) => any>;

}