import type { FullSlug, SimpleSlug } from '~/types/path'

import { trimSuffix } from './trimSuffix'
import { stripSlashes } from './stripSlashses'

export function simplifySlug(fp: FullSlug): SimpleSlug {
    const res = stripSlashes(trimSuffix(fp, 'index'), true)
    return (res.length === 0 ? '/' : res) as SimpleSlug
}
