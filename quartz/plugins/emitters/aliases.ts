import path from 'node:path'

import type { VFile } from 'vfile'

import type { QuartzEmitterPlugin } from '~/types/plugins'
import type { FullSlug } from '~/types/path'
import type { BuildCtx } from '~/types/ctx'

import { simplifySlug } from '~/utils/path/simplifySlug'
import { resolveRelative } from '~/utils/path/resolveRelative'
import { isRelativeURL } from '~/utils/path/isRelativeURL'

import { write } from './helpers'

async function* processFile(ctx: BuildCtx, file: VFile) {
    const ogSlug = simplifySlug(file.data.slug!)

    for (const aliasTarget of file.data.aliases ?? []) {
        const aliasTargetSlug = (
            isRelativeURL(aliasTarget)
                ? path.normalize(path.join(ogSlug, '..', aliasTarget))
                : aliasTarget
        ) as FullSlug

        const redirUrl = resolveRelative(aliasTargetSlug, ogSlug)
        yield write({
            ctx,
            content: `
        <!DOCTYPE html>
        <html lang="en-us">
        <head>
        <title>${ogSlug}</title>
        <link rel="canonical" href="${redirUrl}">
        <meta name="robots" content="noindex">
        <meta charset="utf-8">
        <meta http-equiv="refresh" content="0; url=${redirUrl}">
        </head>
        </html>
        `,
            slug: aliasTargetSlug,
            ext: '.html'
        })
    }
}

export const AliasRedirects: QuartzEmitterPlugin = () => ({
    name: 'AliasRedirects',
    async *emit(ctx, content) {
        for (const [_tree, file] of content) {
            yield* processFile(ctx, file)
        }
    },
    async *partialEmit(ctx, _content, _resources, changeEvents) {
        for (const changeEvent of changeEvents) {
            if (!changeEvent.file) continue
            if (changeEvent.type === 'add' || changeEvent.type === 'change') {
                // add new ones if this file still exists
                yield* processFile(ctx, changeEvent.file)
            }
        }
    }
})
