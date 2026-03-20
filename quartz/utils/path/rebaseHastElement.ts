import type { Element as HastElement } from 'hast'

import type { FullSlug } from '~/types/path'

import { resolveRelative } from './resolveRelative'
import { joinSegments } from './joinSegments'
import { isRelativeURL } from './isRelativeURL'

export function rebaseHastElement(
    el: HastElement,
    attr: string,
    curBase: FullSlug,
    newBase: FullSlug
): void {
    if (el.properties?.[attr]) {
        if (!isRelativeURL(String(el.properties[attr]))) {
            return
        }

        const rel = joinSegments(
            resolveRelative(curBase, newBase),
            '..',
            el.properties[attr] as string
        )
        el.properties[attr] = rel
    }
}
