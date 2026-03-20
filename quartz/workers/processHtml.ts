import type { MarkdownContent, ProcessedContent } from '~/types/vfile'
import type { BuildCtx, WorkerSerializableBuildCtx } from '~/types/ctx'

import quartzConfig from '~quartzConfig'
import { createMarkdownParser } from '~/processors/parser/createMarkdownParser'
import { createHtmlProcessor } from '~/processors/parser/createHtmlProcessor'

// only called from worker thread
export function processHtml(
    partialCtx: WorkerSerializableBuildCtx,
    mds: MarkdownContent[]
): Promise<ProcessedContent[]> {
    const ctx: BuildCtx = {
        ...partialCtx,
        cfg: quartzConfig
    }
    return createMarkdownParser(ctx, mds)(createHtmlProcessor(ctx))
}
