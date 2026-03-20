import type { FullSlug, RelativeURL } from '~/types/path'

export function pathToRoot(slug: FullSlug): RelativeURL {
    let rootPath = slug
        .split('/')
        .filter((x) => x !== '')
        .slice(0, -1)
        .map((_) => '..')
        .join('/')

    if (rootPath.length === 0) {
        rootPath = '.'
    }

    return rootPath as RelativeURL
}
