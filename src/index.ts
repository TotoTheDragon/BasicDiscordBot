import { token } from "./config";
import { WrappedClient } from "./client";

const client: WrappedClient = new WrappedClient({ restTimeOffset: 0 });

client.login(token);

