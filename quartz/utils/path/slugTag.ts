import { sluggify } from './sluggify'

export function slugTag(tag: string) {
    return tag
        .split('/')
        .map((tagSegment) => sluggify(tagSegment))
        .join('/')
}
