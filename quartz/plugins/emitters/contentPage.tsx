import { styleText } from 'node:util'
import path from 'node:path'

import type { Node } from 'unist'

import type { QuartzPluginData } from '~/types/vfile'
import type { StaticResources } from '~/types/resources'
import type { QuartzEmitterPlugin } from '~/types/plugins'
import type { FullPageLayout } from '~/types/layout'
import type { QuartzComponentProps } from '~/types/jsx'
import type { BuildCtx } from '~/types/ctx'

import { defaultContentPageLayout, sharedPageComponents } from '~quartzLayout'
import { pathToRoot } from '~/utils/path/pathToRoot'
import { pageResources, renderPage } from '~/components/renderPage'
import HeaderConstructor from '~/components/Header'
import BodyConstructor from '~/components/Body'
import { Content } from '~/components'

import { write } from './helpers'

async function processContent(
    ctx: BuildCtx,
    tree: Node,
    fileData: QuartzPluginData,
    allFiles: QuartzPluginData[],
    opts: FullPageLayout,
    resources: StaticResources
) {
    const slug = fileData.slug!
    const cfg = ctx.cfg.configuration
    const externalResources = pageResources(pathToRoot(slug), resources)
    const componentData: QuartzComponentProps = {
        ctx,
        fileData,
        externalResources,
        cfg,
        children: [],
        tree,
        allFiles
    }

    const content = renderPage(
        cfg,
        slug,
        componentData,
        opts,
        externalResources
    )
    return write({
        ctx,
        content,
        slug,
        ext: '.html'
    })
}

export const ContentPage: QuartzEmitterPlugin<Partial<FullPageLayout>> = (
    userOpts
) => {
    const opts: FullPageLayout = {
        ...sharedPageComponents,
        ...defaultContentPageLayout,
        pageBody: Content(),
        ...userOpts
    }

    const {
        head: Head,
        header,
        beforeBody,
        pageBody,
        afterBody,
        left,
        right,
        footer: Footer
    } = opts
    const Header = HeaderConstructor()
    const Body = BodyConstructor()

    return {
        name: 'ContentPage',
        getQuartzComponents() {
            return [
                Head,
                Header,
                Body,
                ...header,
                ...beforeBody,
                pageBody,
                ...afterBody,
                ...left,
                ...right,
                Footer
            ]
        },
        async *emit(ctx, content, resources) {
            const allFiles = content.map((c) => c[1].data)
            let containsIndex = false

            for (const [tree, file] of content) {
                const slug = file.data.slug!
                if (slug === 'index') {
                    containsIndex = true
                }

                // only process home page, non-tag pages, and non-index pages
                if (slug.endsWith('/index') || slug.startsWith('tags/'))
                    continue
                yield processContent(
                    ctx,
                    tree,
                    file.data,
                    allFiles,
                    opts,
                    resources
                )
            }

            if (!containsIndex) {
                console.log(
                    styleText(
                        'yellow',
                        `\nWarning: you seem to be missing an \`index.md\` home page file at the root of your \`${ctx.argv.directory}\` folder (\`${path.join(ctx.argv.directory, 'index.md')} does not exist\`). This may cause errors when deploying.`
                    )
                )
            }
        },
        async *partialEmit(ctx, content, resources, changeEvents) {
            const allFiles = content.map((c) => c[1].data)

            // find all slugs that changed or were added
            const changedSlugs = new Set<string>()
            for (const changeEvent of changeEvents) {
                if (!changeEvent.file) continue
                if (
                    changeEvent.type === 'add' ||
                    changeEvent.type === 'change'
                ) {
                    changedSlugs.add(changeEvent.file.data.slug!)
                }
            }

            for (const [tree, file] of content) {
                const slug = file.data.slug!
                if (!changedSlugs.has(slug)) continue
                if (slug.endsWith('/index') || slug.startsWith('tags/'))
                    continue

                yield processContent(
                    ctx,
                    tree,
                    file.data,
                    allFiles,
                    opts,
                    resources
                )
            }
        }
    }
}
