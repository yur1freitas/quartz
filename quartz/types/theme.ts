import type { FontSpecification } from './font'
import type { Colors } from './colors'

export type FontOrigin = 'googleFonts' | 'local'

export interface Typography {
    title?: FontSpecification
    header: FontSpecification
    body: FontSpecification
    code: FontSpecification
}

export interface Theme {
    colors: Colors
    cdnCaching: boolean
    typography: Typography
    fontOrigin: FontOrigin
}
