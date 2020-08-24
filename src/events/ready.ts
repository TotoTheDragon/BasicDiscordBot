import { Event } from "../objects/Event";
import { WrappedClient } from "../client";

export class Ready implements Event {
    event = "ready";
    type = "once";
    listener = (client: WrappedClient) => {
        console.log("Succesfully started up boiler bot!");
        console.log(`Logged in to ${client.user.username}#${client.user.discriminator} in ${client.guilds.cache.size} servers`)
    };

}
