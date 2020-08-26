import { WrappedClient } from "./client";

const client: WrappedClient = new WrappedClient({ restTimeOffset: 0 });

async function start() {
    await client.initialize();

    client.login(client.getGlobalSettings().get("bot", "token"));
}

start();



