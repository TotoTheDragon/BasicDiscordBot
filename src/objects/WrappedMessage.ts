import { Message } from "discord.js";
import { Settings } from "./Settings";

export class WrappedMessage extends Message {

    settings: Settings;

}