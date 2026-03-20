import type { FilePath, FullSlug, SimpleSlug } from './path'

export type ContentIndexMap = Map<FullSlug, ContentDetails>

export type ContentDetails = {
    slug: FullSlug
    filePath: FilePath
    title: string
    links: SimpleSlug[]
    tags: string[]
    content: string
    richContent?: string
    date?: Date
    description?: string
}
