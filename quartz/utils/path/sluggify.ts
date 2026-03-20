export function sluggify(input: string): string {
    return input
        .split('/')
        .map((segment) =>
            segment
                .replace(/\s/g, '-')
                .replace(/&/g, '-and-')
                .replace(/%/g, '-percent')
                .replace(/\?/g, '')
                .replace(/#/g, '')
        )
        .join('/') // always use / as sep
        .replace(/\/$/, '')
}
