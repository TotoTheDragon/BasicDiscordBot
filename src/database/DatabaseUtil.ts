import Guild, { IGuild, IGuildSettings } from "./schemas/Guild";

/*
    All database getters/setters for guilds
*/

export async function getGuild(id: string): Promise<IGuild> {
    let guild: IGuild = await Guild.findById(id);
    if (!guild) guild = await Guild.findById(id);
    if (!guild) {
        guild = new Guild({ _id: id });
        await guild.save((err) => console.log(err));
        guild = await getGuild(id);
    }
    return guild;
}

export async function updateSettings(id: string, paramSettings: IGuildSettings): Promise<IGuild> {
    return await Guild.findByIdAndUpdate(id, { $set: { settings: paramSettings } })
}

export async function getSettings(id: string): Promise<IGuildSettings> {
    return (await getGuild(id)).settings;
}

/*
    All database getters/setters for other things
*/