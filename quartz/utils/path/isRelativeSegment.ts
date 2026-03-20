export function isRelativeSegment(input: string): boolean {
    return /^\.{0,2}$/.test(input)
}
