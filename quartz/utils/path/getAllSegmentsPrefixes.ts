export function getAllSegmentPrefixes(tags: string): string[] {
    const segments = tags.split('/')
    const results: string[] = []

    for (let i = 0; i < segments.length; i++) {
        results.push(segments.slice(0, i + 1).join('/'))
    }

    return results
}
