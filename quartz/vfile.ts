import type { Root as HtmlRoot } from 'hast'

import { VFile } from 'vfile'

import type { ProcessedContent, QuartzPluginData } from './types/vfile'

export function defaultProcessedContent(
    vfileData: Partial<QuartzPluginData>
): ProcessedContent {
    const root: HtmlRoot = { type: 'root', children: [] }

    const vfile = new VFile('')
    vfile.data = vfileData

    return [root, vfile]
}
