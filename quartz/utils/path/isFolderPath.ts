import { endsWith } from './endsWith'

export function isFolderPath(fplike: string): boolean {
    return (
        fplike.endsWith('/') ||
        endsWith(fplike, 'index') ||
        endsWith(fplike, 'index.md') ||
        endsWith(fplike, 'index.html')
    )
}
