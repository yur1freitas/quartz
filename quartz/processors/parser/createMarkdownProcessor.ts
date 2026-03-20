import type { Processor } from 'unified'
import type { Root as MDRoot } from 'mdast'

import { unified } from 'unified'
import remarkParse from 'remark-parse'

import type { BuildCtx } from '~/types/ctx'

export type QuartzMdProcessor = Processor<MDRoot, MDRoot, MDRoot>

export function createMarkdownProcessor(ctx: BuildCtx): QuartzMdProcessor {
    const transformers = ctx.cfg.plugins.transformers

    return (
        unified()
            // base Markdown -> MD AST
            .use(remarkParse)
            // MD AST -> MD AST transforms
            .use(
                transformers.flatMap(
                    (plugin) => plugin.markdownPlugins?.(ctx) ?? []
                )
            ) as unknown as QuartzMdProcessor
        //  ^ sadly the typing of `use` is not smart enough to infer the correct type from our plugin list
    )
}
