import type { Theme } from '~/types/theme'

import { formatFontSpecification } from './formatFontSpecification'

export function googleFontHref(theme: Theme): string {
    const { header, body, code } = theme.typography

    const headerFont = formatFontSpecification('header', header)
    const bodyFont = formatFontSpecification('body', body)
    const codeFont = formatFontSpecification('code', code)

    return `https://fonts.googleapis.com/css2?family=${headerFont}&family=${bodyFont}&family=${codeFont}&display=swap`
}
