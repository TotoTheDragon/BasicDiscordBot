import { Menu } from "./Menu";
import { CommandInfo } from "../objects/commands/CommandInfo";

export class MenuHolder {

    menus: Menu[];

    createMenu(): MenuHolder {
        const menu = new Menu()
            .setHolder(this)
            .setPage(this.menus.length + 1);
        this.menus.push(menu);
        return this;
    }

    addMenu(paramMenu: Menu) {
        const page = this.menus.push(paramMenu);
        const menu = this.menus[page - 1];
        menu.holder = this;
        menu.page = page;
    }

    getMenu(page: number): Menu {
        return this.menus[page - 1];
    }

    send(info: CommandInfo, page: number, parse?: boolean) {
        const menu = this.getMenu(page);
        if (menu) menu.send(info, parse);
    }

}