import { getFileExtension } from './getFileExtension'

export function hasFileExtension(input: string): boolean {
    return getFileExtension(input) !== undefined
}
