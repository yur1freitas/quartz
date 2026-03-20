import type { FullSlug, RelativeURL } from '~/types/path'

import { transformInternalLink } from './transformInternalLink'
import { stripSlashes } from './stripSlashses'
import { splitAnchor } from './splitAnchor'
import { resolveRelative } from './resolveRelative'
import { pathToRoot } from './pathToRoot'
import { joinSegments } from './joinSegments'
import { isFolderPath } from './isFolderPath'

export interface TransformOptions {
    strategy: 'absolute' | 'relative' | 'shortest'
    allSlugs: FullSlug[]
}

export function transformLink(
    src: FullSlug,
    target: string,
    opts: TransformOptions
): RelativeURL {
    let targetSlug = transformInternalLink(target)

    if (opts.strategy === 'relative') {
        return targetSlug as RelativeURL
    } else {
        const folderTail = isFolderPath(targetSlug) ? '/' : ''
        const canonicalSlug = stripSlashes(targetSlug.slice('.'.length))
        let [targetCanonical, targetAnchor] = splitAnchor(canonicalSlug)

        if (opts.strategy === 'shortest') {
            // if the file name is unique, then it's just the filename
            const matchingFileNames = opts.allSlugs.filter((slug) => {
                const parts = slug.split('/')
                const fileName = parts.at(-1)
                return targetCanonical === fileName
            })

            // only match, just use it
            if (matchingFileNames.length === 1) {
                const targetSlug = matchingFileNames[0]
                return (resolveRelative(src, targetSlug) +
                    targetAnchor) as RelativeURL
            }
        }

        // if it's not unique, then it's the absolute path from the vault root
        return (joinSegments(pathToRoot(src), canonicalSlug) +
            folderTail) as RelativeURL
    }
}
