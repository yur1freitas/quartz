import type { Extension } from '@codemirror/state'
import type { TagStyle } from '@codemirror/language'

import { EditorView } from 'codemirror'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'

interface Options {
    variant: Variant
    settings: Settings
    styles: TagStyle[]
}

type Variant = 'light' | 'dark'

interface Settings {
    background: string
    foreground: string
    caret: string
    selection: string
    lineHighlight: string
    gutterBackground: string
    gutterForeground: string
}

/**
 * Original code: https://github.com/vadimdemedes/thememirror/blob/main/source/create-theme.ts
 */
export function createCodeMirrorTheme({
    variant,
    settings,
    styles
}: Options): Extension {
    const theme = EditorView.theme(
        {
            '&': {
                backgroundColor: settings.background,
                color: settings.foreground
            },
            '.cm-content': {
                caretColor: settings.caret
            },
            '.cm-cursor, .cm-dropCursor': {
                borderLeftColor: settings.caret
            },
            '&.cm-focused .cm-selectionBackgroundm .cm-selectionBackground, .cm-content ::selection':
                {
                    backgroundColor: settings.selection
                },
            '.cm-activeLine': {
                backgroundColor: settings.lineHighlight
            },
            '.cm-gutters': {
                backgroundColor: settings.gutterBackground,
                color: settings.gutterForeground
            },
            '.cm-activeLineGutter': {
                backgroundColor: settings.lineHighlight
            }
        },
        {
            dark: variant === 'dark'
        }
    )

    const highlightStyle = HighlightStyle.define(styles)
    const extension = [theme, syntaxHighlighting(highlightStyle)]

    return extension
}
