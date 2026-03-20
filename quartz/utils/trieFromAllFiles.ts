import type { QuartzPluginData } from '~/types/vfile'
import type { BuildTimeTrieData } from '~/types/ctx'

import { FileTrieNode } from './models/FileTrieNode'

export function trieFromAllFiles(
    allFiles: QuartzPluginData[]
): FileTrieNode<BuildTimeTrieData> {
    const trie = new FileTrieNode<BuildTimeTrieData>([])

    for (const file of allFiles) {
        if (file.frontmatter) {
            trie.add({
                ...file,
                slug: file.slug!,
                title: file.frontmatter.title,
                filePath: file.filePath!
            })
        }
    }

    return trie
}
