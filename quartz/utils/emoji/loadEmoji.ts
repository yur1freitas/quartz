type EmojiMap = {
    codePointToName: Record<string, string>
    nameToBase64: Record<string, string>
}

let emojimap: EmojiMap | null = null

export async function loadEmoji(code: string) {
    if (!emojimap) {
        const { default: data } = await import('./emojimap.json', {
            assert: {
                type: 'json'
            }
        })

        emojimap = data as EmojiMap
    }

    const name = emojimap.codePointToName[`${code.toUpperCase()}`]
    if (!name) throw new Error(`codepoint ${code} not found in map`)

    const b64 = emojimap.nameToBase64[name]
    if (!b64) throw new Error(`name ${name} not found in map`)

    return b64
}
