import type { Theme } from '~/types/theme'

import { formatFontSpecification } from './formatFontSpecification'

export function googleFontSubsetHref(theme: Theme, text: string) {
    const title = theme.typography.title || theme.typography.header
    const titleFont = formatFontSpecification('title', title)

    return `https://fonts.googleapis.com/css2?family=${titleFont}&text=${encodeURIComponent(text)}&display=swap`
}
