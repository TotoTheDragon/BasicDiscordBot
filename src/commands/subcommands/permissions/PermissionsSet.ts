import { Collection, PermissionResolvable, Permissions, Role, User } from "discord.js";
import { WrappedClient } from "../../../client";
import { IntegerArgument } from "../../../objects/commands/arguments/IntegerArgument";
import { RoleArgument } from "../../../objects/commands/arguments/RoleArgument";
import { StringArgument } from "../../../objects/commands/arguments/StringArgument";
import { UserArgument } from "../../../objects/commands/arguments/UserArgument";
import { Command } from "../../../objects/commands/Command";
import { CommandInfo } from "../../../objects/commands/CommandInfo";
import { IModule } from "../../../objects/modules/IModule";
import { getInfoEmbed } from "../../../util/EmbedUtil";

export class PermissionsSet extends Command {
    label = "set";
    description = "Used to configure settings for your modules";
    category = "Server Owner";
    defaultLevel = 100;
    allowInDM = false;
    arguments = [
        new StringArgument().setIdentifier("target").setRequired(true).setLimit(1),
        new IntegerArgument().setIdentifier("level").setRequired(true)
    ]
    run = async (client: WrappedClient, info: CommandInfo, args: string[], mappedArgs: Map<string, any>) => {

        const user: User = new UserArgument().parse(mappedArgs.get("target"));
        const role: Role = new RoleArgument().parse(mappedArgs.get("target"), info.guild.id);
        const guildperm: number = Permissions.FLAGS[mappedArgs.get("target")];

        let target: string = undefined;

        if (user !== undefined) {
            target = `<@${user.id}>`;
        } else if (role !== undefined) {
            target = `<@&${role.id}>`;
        } else if (guildperm !== undefined) {
            for(const k in Permissions.FLAGS){
                if(Permissions.FLAGS[k] == guildperm){
                    target = k;
                    return;
                }
            }
        }

        info.channel.send(`${info.user.tag} set permissions for ${target} to ${mappedArgs.get("level")}`);        
    }

}