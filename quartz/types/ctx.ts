import type { FileTrieNode } from '~/utils/models/FileTrieNode'

import type { QuartzPluginData } from './vfile'
import type { FilePath, FullSlug } from './path'
import type { QuartzConfig } from './config'

export interface Argv {
    directory: string
    verbose: boolean
    output: string
    serve: boolean
    watch: boolean
    port: number
    wsPort: number
    remoteDevHost?: string
    concurrency?: number
}

export type BuildTimeTrieData = QuartzPluginData & {
    slug: string
    title: string
    filePath: string
}

export interface BuildCtx {
    buildId: string
    argv: Argv
    cfg: QuartzConfig
    allSlugs: FullSlug[]
    allFiles: FilePath[]
    trie?: FileTrieNode<BuildTimeTrieData>
    incremental: boolean
}

export type WorkerSerializableBuildCtx = Omit<BuildCtx, 'cfg' | 'trie'>
