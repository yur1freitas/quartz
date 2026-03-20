import type { FullSlug } from '~/types/path'

import { containsForbiddenChars } from './containsForbiddenChars'

export function isFullSlug(input: string): input is FullSlug {
    const validStart = !(input.startsWith('.') || input.startsWith('/'))
    const validEnding = !input.endsWith('/')
    return validStart && validEnding && !containsForbiddenChars(input)
}
