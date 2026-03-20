import type { Processor } from 'unified'
import type { Root as MDRoot } from 'mdast'
import type { Root as HTMLRoot } from 'hast'

import { unified } from 'unified'
import remarkRehype from 'remark-rehype'

import type { BuildCtx } from '~/types/ctx'

export type QuartzHtmlProcessor = Processor<undefined, MDRoot, HTMLRoot>

export function createHtmlProcessor(ctx: BuildCtx): QuartzHtmlProcessor {
    const transformers = ctx.cfg.plugins.transformers
    return (
        unified()
            // MD AST -> HTML AST
            .use(remarkRehype, { allowDangerousHtml: true })
            // HTML AST -> HTML AST transforms
            .use(
                transformers.flatMap(
                    (plugin) => plugin.htmlPlugins?.(ctx) ?? []
                )
            )
    )
}
