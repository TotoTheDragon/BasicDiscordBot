export function escapeRegex(string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function parsePlaceholders(str: string, placeholders: Map<string, string>): string {
    placeholders.forEach((v, k) => str.replace(new RegExp(escapeRegex(k), "g"), v));
    return str;
}

