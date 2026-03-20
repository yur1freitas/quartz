import type { Root as MDRoot } from 'mdast'

import type { MarkdownContent, ProcessedContent } from '~/types/vfile'
import type { BuildCtx } from '~/types/ctx'

import { trace } from '~/utils/trace'
import { PerfTimer } from '~/utils/models/PerfTime'

import type { QuartzHtmlProcessor } from './createHtmlProcessor'

export function createMarkdownParser(
    ctx: BuildCtx,
    mdContent: MarkdownContent[]
) {
    return async (processor: QuartzHtmlProcessor) => {
        const res: ProcessedContent[] = []
        for (const [ast, file] of mdContent) {
            try {
                const perf = new PerfTimer()

                const newAst = await processor.run(ast as MDRoot, file)
                res.push([newAst, file])

                if (ctx.argv.verbose) {
                    console.log(
                        `[html] ${file.data.slug} (${perf.timeSince()})`
                    )
                }
            } catch (err) {
                trace(
                    `\nFailed to process html \`${file.data.filePath}\``,
                    err as Error
                )
            }
        }

        return res
    }
}
