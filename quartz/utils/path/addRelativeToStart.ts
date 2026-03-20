import { joinSegments } from './joinSegments'

export function addRelativeToStart(input: string): string {
    if (input === '') {
        input = '.'
    }

    if (!input.startsWith('.')) {
        input = joinSegments('.', input)
    }

    return input
}
