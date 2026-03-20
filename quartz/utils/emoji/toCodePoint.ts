export function toCodePoint(unicodeSurrogates: string): string {
    const r = []

    let c = 0,
        p = 0,
        i = 0

    while (i < unicodeSurrogates.length) {
        c = unicodeSurrogates.charCodeAt(i++)
        if (p) {
            r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16))
            p = 0
        } else if (55296 <= c && c <= 56319) {
            p = c
        } else {
            r.push(c.toString(16))
        }
    }

    return r.join('-')
}
