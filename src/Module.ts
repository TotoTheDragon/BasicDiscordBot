import { IModule } from "./objects/modules/IModule";
import { Configuration } from "./Configuration";

export class Module extends IModule {
    name = "BoilerBot";
    identifier = "bot";
    version = "0.1";
    description = "The module that handles all the inner workings of the BoilerBot";
    dependencies = [];
    botSetupEnabled = false;
    guildSetupEnabled = false;
    configuration = new Configuration();
}