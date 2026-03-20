export function stripSlashes(input: string, onlyStripPrefix?: boolean): string {
    if (input.startsWith('/')) {
        input = input.substring(1)
    }

    if (!onlyStripPrefix && input.endsWith('/')) {
        input = input.slice(0, -1)
    }

    return input
}
