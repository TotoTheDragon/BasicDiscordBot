import { EmbedStyle } from "../objects/EmbedStyle";
import { utils } from "./EmojiUtil";
import { WrappedClient } from "../client";

export function getErrorEmbed(): EmbedStyle {
    return new EmbedStyle()
        .setTitle("Error", `${utils.get("error")} `)
        .setColor("#ff3333")
        .setFooter(WrappedClient.instance.settings.get("bot", "footer"), WrappedClient.instance.settings.get("bot", "footer-url"))
        .setTimestamp();
}

export function getInfoEmbed(): EmbedStyle {
    return new EmbedStyle()
        .setColor("#3333d3")
        .setFooter(WrappedClient.instance.settings.get("bot", "footer"), WrappedClient.instance.settings.get("bot", "footer-url"))
        .setTimestamp();
}

export function getNoPermissionEmbed(): EmbedStyle {
    return new EmbedStyle()
        .setColor("#ff3333")
        .setTitle("No permission", `${utils.get("no_permission")} `)
        .setFooter(WrappedClient.instance.settings.get("bot", "footer"), WrappedClient.instance.settings.get("bot", "footer-url"))
        .setTimestamp();
}