import type { FilePath } from '~/types/path'

import { hasFileExtension } from './hasFileExtension'

export function isFilePath(input: string): input is FilePath {
    const validStart = !input.startsWith('.')

    return validStart && hasFileExtension(input)
}
