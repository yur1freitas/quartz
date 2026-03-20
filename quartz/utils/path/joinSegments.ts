import { stripSlashes } from './stripSlashses'

export function joinSegments(...args: string[]): string {
    if (args.length === 0) {
        return ''
    }

    let joined = args
        .filter((segment) => segment !== '' && segment !== '/')
        .map((segment) => stripSlashes(segment))
        .join('/')

    // if the first segment starts with a slash, add it back
    if (args[0].startsWith('/')) {
        joined = '/' + joined
    }

    // if the last segment is a folder, add a trailing slash
    if (args[args.length - 1].endsWith('/')) {
        joined = joined + '/'
    }

    return joined
}
