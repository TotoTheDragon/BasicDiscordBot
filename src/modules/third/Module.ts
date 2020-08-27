import { IModule } from "../../objects/modules/IModule";

export class Module extends IModule {
    name = "A test module";
    identifier = "test";
    version = "1.0";
    description = "An empty module, used for testing the loading mechanism";
    dependencies = [];
    botSetupEnabled = false;
    guildSetupEnabled = false;
}