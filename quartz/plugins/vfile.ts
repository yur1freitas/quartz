import { Data, VFile } from 'vfile'
import { Root as MdRoot } from 'mdast'
import { Root as HtmlRoot } from 'hast'

export type QuartzPluginData = Data
export type MarkdownContent = [MdRoot, VFile]
export type ProcessedContent = [HtmlRoot, VFile]

export function defaultProcessedContent(
    vfileData: Partial<QuartzPluginData>
): ProcessedContent {
    const root: HtmlRoot = { type: 'root', children: [] }
    const vfile = new VFile('')
    vfile.data = vfileData
    return [root, vfile]
}
