import type { FilePath, FullSlug } from '~/types/path'

import { stripSlashes } from './stripSlashses'
import { sluggify } from './sluggify'
import { getFileExtension } from './getFileExtension'
import { endsWith } from './endsWith'

export function sluggifyFilePath(
    filePath: FilePath,
    excludeExt?: boolean
): FullSlug {
    filePath = stripSlashes(filePath) as FilePath

    let ext = getFileExtension(filePath)
    const withoutFileExt = filePath.replace(new RegExp(ext + '$'), '')

    if (excludeExt || ['.md', '.html', undefined].includes(ext)) {
        ext = ''
    }

    let slug = sluggify(withoutFileExt)

    // treat _index as index
    if (endsWith(slug, '_index')) {
        slug = slug.replace(/_index$/, 'index')
    }

    return (slug + ext) as FullSlug
}
