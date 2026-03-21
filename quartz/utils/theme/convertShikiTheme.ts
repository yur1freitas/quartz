import type { Tag } from '@lezer/highlight'
import type { Extension } from '@codemirror/state'
import type { TagStyle } from '@codemirror/language'

import { tags } from '@lezer/highlight'

import { createCodeMirrorTheme } from './createCodeMirrorTheme'

const scopeMapping: Record<string, any> = Object.freeze({
    punctuation: { default: tags.punctuation },
    storage: {
        modifier: { default: tags.modifier },
        separator: { default: tags.separator },
        type: {
            default: tags.typeName
        }
    },
    keyword: {
        default: tags.keyword,
        control: { default: tags.controlKeyword },
        operator: {
            default: [
                tags.operatorKeyword,
                tags.arithmeticOperator,
                tags.definitionOperator
            ],
            logical: {
                default: tags.logicOperator
            }
        },
        other: {
            unit: { default: tags.unit },
            template: { default: tags.special(tags.keyword) }
        }
    },
    property: { default: tags.propertyName },
    identifier: { default: tags.variableName },
    variable: {
        default: [
            tags.self,
            tags.variableName,
            tags.function(tags.propertyName)
        ],
        language: { default: tags.self },
        other: { default: tags.variableName },
        parameter: {
            function: { default: tags.function(tags.propertyName) }
        }
    },
    number: { default: tags.number },
    string: {
        default: tags.string,
        quoted: { default: tags.quote },
        regex: { default: tags.regexp },
        comment: { default: tags.comment },
        template: { default: tags.special(tags.string) }
    },
    namespace: { default: tags.namespace },
    comment: { default: tags.comment },
    constant: {
        default: tags.constant(tags.name),
        language: { default: tags.constant(tags.self) },
        numeric: { default: tags.constant(tags.number) },
        character: { default: tags.constant(tags.character) }
    },
    entity: {
        name: {
            default: [tags.name, tags.function(tags.variableName)],
            tag: { default: tags.tagName },
            type: { default: tags.typeName },
            constant: { default: tags.constant(tags.name) },
            function: { default: tags.function(tags.variableName) }
        }
    },
    brackethighlighter: {
        round: { default: tags.paren },
        tag: { default: tags.bracket },
        quote: { default: tags.bracket },
        curly: { default: tags.bracket },
        angle: { default: tags.angleBracket },
        square: { default: tags.squareBracket }
    }
})

const resolveScope = (scope: string | string[]) => {
    if (typeof scope === 'string') {
        return [scope.replace(/\s+/g, '_')]
    }

    return scope
}

export function convertShikiTheme(theme: Record<string, any>): Extension {
    const styles: TagStyle[] = []

    for (const tokenColor of theme.tokenColors) {
        if (!Object.hasOwn(tokenColor, 'scope')) continue

        const tags: (Tag | Tag[])[] = []

        for (const scope of resolveScope(tokenColor.scope)) {
            let value = scopeMapping

            for (const path of scope.split('.')) {
                value = value?.[path]

                if (!value) {
                    break
                }
            }

            const tag = value?.default as Tag | Tag[] | undefined

            if (tag) {
                tags.push(tag)
            }
        }

        if (tags.length > 0) {
            styles.push({
                tag: tags.flat(1),
                color: tokenColor.settings?.foreground
            })
        }
    }

    return createCodeMirrorTheme({
        styles,
        variant: theme.type,
        settings: {
            caret: theme.colors['editorCursor.background'],
            background: theme.colors['editor.background'],
            foreground: theme.colors['editor.foreground'],
            gutterBackground: theme.colors['editor.background'],
            gutterForeground: theme.colors['editor.foreground'],
            selection: theme.colors['editor.selectionBackground'],
            lineHighlight: theme.colors['editor.selectionHighlightBackground']
        }
    })
}
