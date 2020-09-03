import { MenuHolder } from "./MenuHolder";
import { EmbedStyle } from "../objects/EmbedStyle";
import { ColorResolvable } from "discord.js";
import { CommandInfo } from "../objects/commands/CommandInfo";

export class Menu {

    holder: MenuHolder
    page: number;
    styling: EmbedStyle;

    constructor() {

    }

    setHolder(paramHolder: MenuHolder): Menu {
        this.holder = paramHolder;
        return this;
    }

    setPage(paramNumber: number): Menu {
        this.page = paramNumber;
        return this;
    }

    setTitle(paramString: string): Menu {
        this.styling.setTitle(paramString);
        return this;
    }

    setColor(paramColor: ColorResolvable): Menu {
        this.styling.setColor(paramColor);
        return this;
    }

    setDescription(paramString: string): Menu {
        this.styling.setDescription(paramString);
        return this;
    }

    setFooter(paramString: string, paramUrl?: string): Menu {
        this.styling.setFooter(paramString, paramUrl);
        return this;
    }

    addField(paramName: string, paramValue: string, inline?: true): Menu {
        this.styling.addField(paramName, paramValue, inline);
        return this;
    }

    parse(): Menu {
        this.setTitle(this.styling.title.replace("%current_page%", this.page.toString()).replace("%total_page%", this.holder.menus.length.toString()));
        this.setFooter(this.styling.footer.replace("%current_page%", this.page.toString()).replace("%total_page%", this.holder.menus.length.toString()));
        this.setDescription(this.styling.description.replace("%current_page%", this.page.toString()).replace("%total_page%", this.holder.menus.length.toString()));
        return this;
    }

    send(commandInfo: CommandInfo, parse?: boolean) {
        if (parse) this.parse();
    }


}