import { WrappedMessage } from "../objects/WrappedMessage";
import { CommandInfo } from "../objects/commands/CommandInfo";

export function getUserLevel(info: CommandInfo): number {

    let levels = info.member.roles
        .cache
        .map(role => info.message.settings.roleLevels.get(role.id))
        .filter(value => value != undefined);

    return levels.length ? Math.max(...levels) : 0;
}