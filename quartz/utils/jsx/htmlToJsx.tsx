import type { JsxElement } from 'hast-util-to-jsx-runtime/lib/types'
import type { Components, Jsx } from 'hast-util-to-jsx-runtime'
import type { Node, Root } from 'hast'

import { Fragment, jsx, jsxs } from 'preact/jsx-runtime'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'

import type { FilePath } from '~/types/path'

import { trace } from '../trace'

const customComponents: Components = {
    table: (props) => (
        <div class='table-container'>
            <table {...props} />
        </div>
    )
}

export function htmlToJsx(fp: FilePath, tree: Node): JsxElement {
    try {
        return toJsxRuntime(tree as Root, {
            Fragment,
            jsx: jsx as Jsx,
            jsxs: jsxs as Jsx,
            elementAttributeNameCase: 'html',
            components: customComponents
        })
    } catch (e) {
        trace(`Failed to parse Markdown in \`${fp}\` into JSX`, e as Error)
    }
}
