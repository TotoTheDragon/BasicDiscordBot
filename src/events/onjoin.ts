import { Guild } from "discord.js";
import { WrappedClient } from "../client";
import { Event } from "../objects/Event";

export class JoinHandler implements Event {
    event = "guildCreate";
    type = "on";
    listener = async (client: WrappedClient, guild: Guild) => {

        const logs = await guild.fetchAuditLogs({ type: "BOT_ADD", limit: 1 });
        const log = logs.entries.first();

        console.log(`I was invited to a guild named ${guild.name} (${guild.id}) by ${log.executor.username}#${log.executor.discriminator}`);

        // Execute code for setups

    };


}
