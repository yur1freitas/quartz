export function endsWith(input: string, suffix: string): boolean {
    return input === suffix || input.endsWith('/' + suffix)
}
