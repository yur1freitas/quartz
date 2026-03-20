import type { JSX } from 'preact/jsx-runtime'

import type { CSSResource } from '~/types/resources'

export function CSSResourceToStyleElement(
    resource: CSSResource,
    preserve?: boolean
): JSX.Element {
    const spaPreserve = preserve ?? resource.spaPreserve
    if (resource.inline ?? false) {
        return <style>{resource.content}</style>
    } else {
        return (
            <link
                key={resource.content}
                href={resource.content}
                rel='stylesheet'
                type='text/css'
                data-persist={spaPreserve}
            />
        )
    }
}
