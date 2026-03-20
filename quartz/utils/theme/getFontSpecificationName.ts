import type { FontSpecification } from '~/types/font'

export function getFontSpecificationName(spec: FontSpecification): string {
    if (typeof spec === 'string') {
        return spec
    }

    return spec.name
}
