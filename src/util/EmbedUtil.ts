import { EmbedStyle } from "../objects/EmbedStyle";
import { utils } from "./EmojiUtil";
import { footer, footerurl } from "../config";

export function getErrorEmbed(): EmbedStyle {
    return new EmbedStyle()
        .setTitle("Error", `${utils.get("error")} `)
        .setColor("#ff3333")
        .setFooter(footer, footerurl)
        .setTimestamp();
}

export function getInfoEmbed(): EmbedStyle {
    return new EmbedStyle()
        .setColor("#3333d3")
        .setFooter(footer, footerurl)
        .setTimestamp();
}

export function getNoPermissionEmbed(): EmbedStyle {
    return new EmbedStyle()
        .setColor("#ff3333")
        .setTitle("No permission", `${utils.get("no_permission")} `)
        .setFooter(footer, footerurl)
        .setTimestamp();
}