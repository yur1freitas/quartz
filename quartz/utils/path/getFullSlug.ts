import type { FullSlug } from '~/types/path'

export function getFullSlug(window: Window): FullSlug {
    return window.document.body.dataset.slug! as FullSlug
}
