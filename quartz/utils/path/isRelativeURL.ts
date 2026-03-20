import type { RelativeURL } from '~/types/path'

import { getFileExtension } from './getFileExtension'
import { endsWith } from './endsWith'

export function isRelativeURL(input: string): input is RelativeURL {
    const validStart = /^\.{1,2}/.test(input)
    const validEnding = !endsWith(input, 'index')

    return (
        validStart &&
        validEnding &&
        !['.md', '.html'].includes(getFileExtension(input) ?? '')
    )
}
