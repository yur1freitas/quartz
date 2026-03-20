import type { Element as HastElement } from 'hast'

import type { FullSlug } from '~/types/path'

import { clone } from '../clone'

import { rebaseHastElement } from './rebaseHastElement'

export function normalizeHastElement(
    rawEl: HastElement,
    curBase: FullSlug,
    newBase: FullSlug
) {
    const el = clone(rawEl) // clone so we dont modify the original page
    rebaseHastElement(el, 'src', curBase, newBase)
    rebaseHastElement(el, 'href', curBase, newBase)

    if (el.children) {
        el.children = el.children.map((child) =>
            normalizeHastElement(child as HastElement, curBase, newBase)
        )
    }

    return el
}
