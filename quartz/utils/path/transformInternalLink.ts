import type { FilePath, RelativeURL } from '~/types/path'

import { stripSlashes } from './stripSlashses'
import { splitAnchor } from './splitAnchor'
import { sluggifyFilePath } from './sluggifyFilePath'
import { simplifySlug } from './simplifySlug'
import { joinSegments } from './joinSegments'
import { isRelativeSegment } from './isRelativeSegment'
import { isFolderPath } from './isFolderPath'
import { addRelativeToStart } from './addRelativeToStart'

export function transformInternalLink(link: string): RelativeURL {
    let [fplike, anchor] = splitAnchor(decodeURI(link))

    const folderPath = isFolderPath(fplike)

    let segments = fplike.split('/').filter((x) => x.length > 0)
    let prefix = segments.filter(isRelativeSegment).join('/')

    let filepath = segments
        .filter((seg) => !isRelativeSegment(seg) && seg !== '')
        .join('/')

    // manually add ext here as we want to not strip 'index' if it has an extension
    const simpleSlug = simplifySlug(sluggifyFilePath(filepath as FilePath))

    const joined = joinSegments(stripSlashes(prefix), stripSlashes(simpleSlug))

    const trail = folderPath ? '/' : ''

    const res = (addRelativeToStart(joined) + trail + anchor) as RelativeURL

    return res
}
