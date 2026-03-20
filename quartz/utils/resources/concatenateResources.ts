import type { StringResource } from '~/types/resources'

export function concatenateResources(
    ...resources: StringResource[]
): StringResource {
    return resources
        .filter(
            (resource): resource is string | string[] => resource !== undefined
        )
        .flat()
}
