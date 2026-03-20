import type { FontSpecification } from '~/types/font'

export function formatFontSpecification(
    type: 'title' | 'header' | 'body' | 'code',
    spec: FontSpecification
): string {
    if (typeof spec === 'string') {
        spec = { name: spec }
    }

    const defaultIncludeWeights = type === 'header' ? [400, 700] : [400, 600]
    const defaultIncludeItalic = type === 'body'
    const weights = spec.weights ?? defaultIncludeWeights
    const italic = spec.includeItalic ?? defaultIncludeItalic

    const features: string[] = []

    if (italic) {
        features.push('ital')
    }

    if (weights.length > 1) {
        const weightSpec = italic
            ? weights
                  .flatMap((w) => [`0,${w}`, `1,${w}`])
                  .sort()
                  .join(';')
            : weights.join(';')

        features.push(`wght@${weightSpec}`)
    }

    if (features.length > 0) {
        return `${spec.name}:${features.join(',')}`
    }

    return spec.name
}
