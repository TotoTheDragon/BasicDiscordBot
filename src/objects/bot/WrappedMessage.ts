import { Message } from "discord.js";
import { CommandInfo } from "../commands/CommandInfo";
import { ModuleSettings } from "./ModuleSettings";

export class WrappedMessage extends Message {

    settings: ModuleSettings;
    info: CommandInfo;

}