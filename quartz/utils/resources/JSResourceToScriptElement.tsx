import { randomUUID } from 'node:crypto'

import type { JSX } from 'preact/jsx-runtime'

import type { JSResource } from '~/types/resources'

export function JSResourceToScriptElement(
    resource: JSResource,
    preserve?: boolean
): JSX.Element {
    const scriptType = resource.moduleType ?? 'application/javascript'
    const spaPreserve = preserve ?? resource.spaPreserve

    if (resource.contentType === 'external') {
        return (
            <script
                key={resource.src}
                src={resource.src}
                type={scriptType}
                data-persist={spaPreserve}
            />
        )
    } else {
        const content = resource.script
        return (
            <script
                key={randomUUID()}
                type={scriptType}
                data-persist={spaPreserve}
                dangerouslySetInnerHTML={{ __html: content }}
            ></script>
        )
    }
}
