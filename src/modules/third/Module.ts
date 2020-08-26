import { IModule } from "../../objects/modules/IModule";
import { CommandInfo } from "../../objects/commands/CommandInfo";

export class Module extends IModule {
    name = "A test module";
    identifier = "test";
    version = "1.0";
    description = "An empty module, used for testing the loading mechanism";
    dependencies = [];
    botSetupEnabled = false;
    guildSetupEnabled = false;
}