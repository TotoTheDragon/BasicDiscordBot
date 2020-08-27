import { Message } from "discord.js";
import { Settings } from "./Settings";
import { CommandInfo } from "../commands/CommandInfo";

export class WrappedMessage extends Message {

    settings: Settings;
    info: CommandInfo;

}