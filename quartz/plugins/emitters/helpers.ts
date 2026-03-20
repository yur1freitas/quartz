import type { Readable } from 'node:stream'

import path from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'

import type { FilePath, FullSlug } from '~/types/path'
import type { BuildCtx } from '~/types/ctx'

import { joinSegments } from '~/utils/path/joinSegments'

type WriteOptions = {
    ctx: BuildCtx
    slug: FullSlug
    ext: `.${string}` | ''
    content: string | Buffer | Readable
}

export const write = async ({
    ctx,
    slug,
    ext,
    content
}: WriteOptions): Promise<FilePath> => {
    const pathToPage = joinSegments(ctx.argv.output, slug + ext) as FilePath
    const dir = path.dirname(pathToPage)

    await mkdir(dir, { recursive: true })
    await writeFile(pathToPage, content)

    return pathToPage
}
