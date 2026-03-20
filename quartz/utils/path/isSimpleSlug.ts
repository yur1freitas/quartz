import type { SimpleSlug } from '~/types/path'

import { hasFileExtension } from './hasFileExtension'
import { endsWith } from './endsWith'
import { containsForbiddenChars } from './containsForbiddenChars'

export function isSimpleSlug(input: string): input is SimpleSlug {
    const validStart = !(
        input.startsWith('.') ||
        (input.length > 1 && input.startsWith('/'))
    )

    const validEnding = !endsWith(input, 'index')

    return (
        validStart &&
        !containsForbiddenChars(input) &&
        validEnding &&
        !hasFileExtension(input)
    )
}
