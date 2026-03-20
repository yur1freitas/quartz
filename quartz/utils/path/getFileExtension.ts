export function getFileExtension(input: string): string | undefined {
    return input.match(/\.[A-Za-z0-9]+$/)?.[0]
}
