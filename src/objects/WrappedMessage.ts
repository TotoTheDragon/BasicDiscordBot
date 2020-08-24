import { Message } from "discord.js";
import { IGuildSettings } from "../database/schemas/Guild";

export class WrappedMessage extends Message {

    settings: IGuildSettings;

}