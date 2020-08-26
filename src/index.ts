import { WrappedClient } from "./client";

const client: WrappedClient = new WrappedClient({ restTimeOffset: 0 });

async function start() {
    await client.initialize();

    client.login(client.settings.get("bot", "token"));
}

start();



