export const multipliers: Map<string, number> = new Map()
    .set("s", 1)
    .set("m", 60)
    .set("h", 3600)
    .set("d", 86400)
    .set("w", 604800)
    .set("M", 2592000)
    .set("y", 31557600)

export function parseTimeFromXtoY(paramTime: number, current: string, want: string): number {
    return Math.floor((paramTime * multipliers.get(current)) / multipliers.get(want));
}

export function parseTimeToSeconds(paramString: string): number {
    let total = 0;

    for (const o of multipliers.keys()) {
        const matcher = paramString.match(new RegExp("(\\d+(?=" + o + "))", "g"));
        if (matcher) total += matcher.map(v => parseInt(v)).reduce((a, b) => a + b) * multipliers.get(o);
    }

    return total;
}