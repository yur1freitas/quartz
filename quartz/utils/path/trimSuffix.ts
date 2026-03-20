import { endsWith } from './endsWith'

export function trimSuffix(input: string, suffix: string): string {
    if (endsWith(input, suffix)) {
        input = input.slice(0, -suffix.length)
    }

    return input
}
