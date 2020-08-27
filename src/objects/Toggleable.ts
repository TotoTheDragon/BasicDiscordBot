export class Toggleable {

    toggle = () => this.isEnable = !this.isEnable;

    enable = () => this.isEnable = true;

    disable = () => this.isEnable = false;

    isEnabled = () => this.isEnable;

    isEnabledMap: Map<string, boolean>;

    constructor(private isEnable: boolean = true, private guildEnable: boolean = true) {
        this.isEnabledMap = new Map();
    }

    isEnabledGuild = (guild: string): boolean => {
        if (!this.isEnabledMap.has(guild)) this.isEnabledMap.set(guild, this.guildEnable);
        return this.isEnabledMap.get(guild);
    }

    toggleGuild = (guild: string) => this.isEnabledMap.set(guild, !this.isEnabledGuild(guild));

    enableGuid = (guild: string) => this.isEnabledMap.set(guild, true);

    disableGuild = (guild: string) => this.isEnabledMap.set(guild, false);

}