import type { FilePath, FullSlug } from '~/types/path'

export * from './transformers'
export * from './filters'
export * from './emitters'

declare module 'vfile' {
    // inserted in processors.ts
    interface DataMap {
        slug: FullSlug
        filePath: FilePath
        relativePath: FilePath
    }
}
