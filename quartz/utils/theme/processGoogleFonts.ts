import type { GoogleFontFile } from '~/types/font'

const fontMimeMap: Record<string, string> = {
    truetype: 'ttf',
    woff: 'woff',
    woff2: 'woff2',
    opentype: 'otf'
}

export async function processGoogleFonts(
    stylesheet: string,
    baseUrl: string
): Promise<{
    processedStylesheet: string
    fontFiles: GoogleFontFile[]
}> {
    const fontSourceRegex =
        /url\((https:\/\/fonts.gstatic.com\/.+(?:\/|(?:kit=))(.+?)[.&].+?)\)\sformat\('(\w+?)'\);/g
    const fontFiles: GoogleFontFile[] = []

    let processedStylesheet = stylesheet

    let match
    while ((match = fontSourceRegex.exec(stylesheet)) !== null) {
        const url = match[1]
        const filename = match[2]
        const extension = fontMimeMap[match[3].toLowerCase()]
        const staticUrl = `https://${baseUrl}/static/fonts/${filename}.${extension}`

        processedStylesheet = processedStylesheet.replace(url, staticUrl)
        fontFiles.push({ url, filename, extension })
    }

    return { processedStylesheet, fontFiles }
}
