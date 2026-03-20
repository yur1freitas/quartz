export function containsForbiddenChars(input: string): boolean {
    return /^[+?&\s]/g.test(input)
}
