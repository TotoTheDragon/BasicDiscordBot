import { Message, EmojiResolvable } from "discord.js";
import { WrappedClient } from "../client";

export const numbers: Map<number, string> = new Map()
    .set(1, "1️⃣")
    .set(2, "2️⃣")
    .set(3, "3️⃣")
    .set(4, "4️⃣")
    .set(5, "5️⃣")
    .set(6, "6️⃣")
    .set(7, "7️⃣")
    .set(8, "8️⃣")
    .set(9, "9️⃣")
    .set(10, "🔟");

export const utils: Map<string, string> = new Map()
    .set("no", "❌")
    .set("yes", "✅")
    .set("warning", "⚠️")
    .set("error", "❌")
    .set("no_permission", "⛔")
    .set("book", "📘");

export const alphabet: Map<string, string> = new Map()
    .set("a", "🇦")
    .set("b", "🇧")
    .set("c", "🇨")
    .set("d", "🇩")
    .set("e", "🇪")
    .set("f", "🇫")
    .set("g", "🇬")
    .set("h", "🇭")
    .set("i", "🇮")
    .set("j", "🇯")
    .set("k", "🇰")
    .set("l", "🇱")
    .set("m", "🇲")
    .set("n", "🇳")
    .set("o", "🇴")
    .set("p", "🇵")
    .set("q", "🇶")
    .set("r", "🇷")
    .set("s", "🇸")
    .set("t", "🇹")
    .set("u", "🇺")
    .set("v", "🇻")
    .set("w", "🇼")
    .set("x", "🇽")
    .set("y", "🇾")
    .set("z", "🇿")


const emojiMatcher: RegExp = new RegExp("(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])");

export async function addEmojis(message: Message, emojis: EmojiResolvable[], max: number = 100): Promise<void> {
    return new Promise(async (resolve, reject) => {
        for (var i: number = 0; i < Math.min(emojis.length, max); i++) try { if (isEmoji(emojis[i])) await message.react(emojis[i]); } catch { }
        resolve()
    })
}

export function isEmoji(paramString: EmojiResolvable): boolean {
    let match = paramString.toString().match(emojiMatcher)
    return (match != null && match.length > 0) || WrappedClient.instance.emojis.resolve(paramString) != null;
}
