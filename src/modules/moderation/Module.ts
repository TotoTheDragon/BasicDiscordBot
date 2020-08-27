import { IModule } from "../../objects/modules/IModule";
import { Configuration } from "./Configuration";

export class Module extends IModule {
    name = "Moderation";
    identifier = "moderation";
    version = "0.1";
    description = "Add basic moderation to your bot";
    dependencies = [];
    botSetupEnabled = false;
    guildSetupEnabled = false;
    configuration = new Configuration();
}