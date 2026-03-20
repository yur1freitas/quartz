import type { FontWeight, SatoriOptions } from 'satori/wasm'

import type { FontSpecification } from '~/types/font'

import { fetchTtf } from '../font/fetchTtf'

const defaultHeaderWeight = [700]
const defaultBodyWeight = [400]

export async function getSatoriFonts(
    headerFont: FontSpecification,
    bodyFont: FontSpecification
) {
    // Get all weights for header and body fonts
    const headerWeights: FontWeight[] = (
        typeof headerFont === 'string'
            ? defaultHeaderWeight
            : (headerFont.weights ?? defaultHeaderWeight)
    ) as FontWeight[]
    const bodyWeights: FontWeight[] = (
        typeof bodyFont === 'string'
            ? defaultBodyWeight
            : (bodyFont.weights ?? defaultBodyWeight)
    ) as FontWeight[]

    const headerFontName =
        typeof headerFont === 'string' ? headerFont : headerFont.name
    const bodyFontName = typeof bodyFont === 'string' ? bodyFont : bodyFont.name

    // Fetch fonts for all weights and convert to satori format in one go
    const headerFontPromises = headerWeights.map(async (weight) => {
        const data = await fetchTtf(headerFontName, weight)
        if (!data) return null
        return {
            name: headerFontName,
            data,
            weight,
            style: 'normal' as const
        }
    })

    const bodyFontPromises = bodyWeights.map(async (weight) => {
        const data = await fetchTtf(bodyFontName, weight)
        if (!data) return null
        return {
            name: bodyFontName,
            data,
            weight,
            style: 'normal' as const
        }
    })

    const [headerFonts, bodyFonts] = await Promise.all([
        Promise.all(headerFontPromises),
        Promise.all(bodyFontPromises)
    ])

    // Filter out any failed fetches and combine header and body fonts
    const fonts: SatoriOptions['fonts'] = [
        ...headerFonts.filter(
            (font): font is NonNullable<typeof font> => font !== null
        ),
        ...bodyFonts.filter(
            (font): font is NonNullable<typeof font> => font !== null
        )
    ]

    return fonts
}
