import type { FullSlug, RelativeURL, SimpleSlug } from '~/types/path'

import { simplifySlug } from './simplifySlug'
import { pathToRoot } from './pathToRoot'
import { joinSegments } from './joinSegments'

export function resolveRelative(
    current: FullSlug,
    target: FullSlug | SimpleSlug
): RelativeURL {
    const res = joinSegments(
        pathToRoot(current),
        simplifySlug(target as FullSlug)
    ) as RelativeURL

    return res
}
