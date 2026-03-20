import type { Data, VFile } from 'vfile'
import type { Root as MdRoot } from 'mdast'
import type { Root as HtmlRoot } from 'hast'

export type QuartzPluginData = Data
export type MarkdownContent = [MdRoot, VFile]
export type ProcessedContent = [HtmlRoot, VFile]
