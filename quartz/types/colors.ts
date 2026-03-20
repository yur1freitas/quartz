export type CustomColorScheme = Record<string, string>

export type DefaultColorScheme = {
    highlight: string
    textHighlight: string

    border: string

    foreground: string
    background: string

    link: string
    linkHover: string

    red: string
    orange: string
    yellow: string
    lime: string
    green: string
    cyan: string

    calloutPadding: string
    calloutBorderRadius: string
    calloutContentBackground: string

    shadow: string
}

export type ColorScheme<T extends CustomColorScheme = DefaultColorScheme> = {
    [K in keyof T]: T[K]
}

export type ColorSchemeMode = 'lightMode' | 'darkMode'

export type Colors = Record<ColorSchemeMode, ColorScheme>
