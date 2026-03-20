export function isAbsoluteURL(input: string): boolean {
    return URL.canParse(input)
}
