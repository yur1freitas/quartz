import { styleText } from 'node:util'
import path from 'node:path'
import { access, readFile, mkdir, writeFile } from 'node:fs/promises'

import type { FontWeight } from 'satori/wasm'

import { QUARTZ } from '~/consts'

/**
 * Get the `.ttf` file of a google font
 * @param fontName name of google font
 * @param weight what font weight to fetch font
 * @returns `.ttf` file of google font
 */
export async function fetchTtf(
    rawFontName: string,
    weight: FontWeight
): Promise<Buffer<ArrayBufferLike> | undefined> {
    const fontName = rawFontName.replaceAll(' ', '+')
    const cacheKey = `${fontName}-${weight}`
    const cacheDir = path.join(QUARTZ, '.quartz-cache', 'fonts')
    const cachePath = path.join(cacheDir, cacheKey)

    // Check if font exists in cache
    try {
        await access(cachePath)
        return readFile(cachePath)
    } catch {
        // ignore errors and fetch font
    }

    // Get css file from google fonts
    const cssResponse = await fetch(
        `https://fonts.googleapis.com/css2?family=${fontName}:wght@${weight}`
    )
    const css = await cssResponse.text()

    // Extract .ttf url from css file
    const urlRegex = /url\((https:\/\/fonts.gstatic.com\/s\/.*?.ttf)\)/g
    const match = urlRegex.exec(css)

    if (!match) {
        console.log(
            styleText(
                'yellow',
                `\nWarning: Failed to fetch font ${rawFontName} with weight ${weight}, got ${cssResponse.statusText}`
            )
        )
        return
    }

    // fontData is an ArrayBuffer containing the .ttf file data
    const fontResponse = await fetch(match[1])
    const fontData = Buffer.from(await fontResponse.arrayBuffer())
    await mkdir(cacheDir, { recursive: true })
    await writeFile(cachePath, fontData)

    return fontData
}
