import path from 'node:path'
import fs from 'node:fs'

import type { QuartzEmitterPlugin } from '~/types/plugins'
import type { FilePath } from '~/types/path'
import type { Argv } from '~/types/ctx'
import type { QuartzConfig } from '~/types/config'

import { sluggifyFilePath } from '~/utils/path/sluggifyFilePath'
import { joinSegments } from '~/utils/path/joinSegments'
import { glob } from '~/utils/glob'

const filesToCopy = async (argv: Argv, cfg: QuartzConfig) => {
    // glob all non MD files in content folder and copy it over
    return await glob('**', argv.directory, [
        '**/*.md',
        ...cfg.configuration.ignorePatterns
    ])
}

const copyFile = async (argv: Argv, fp: FilePath) => {
    const src = joinSegments(argv.directory, fp) as FilePath

    const name = sluggifyFilePath(fp)
    const dest = joinSegments(argv.output, name) as FilePath

    // ensure dir exists
    const dir = path.dirname(dest) as FilePath
    await fs.promises.mkdir(dir, { recursive: true })

    await fs.promises.copyFile(src, dest)
    return dest
}

export const Assets: QuartzEmitterPlugin = () => {
    return {
        name: 'Assets',
        async *emit({ argv, cfg }) {
            const fps = await filesToCopy(argv, cfg)
            for (const fp of fps) {
                yield copyFile(argv, fp)
            }
        },
        async *partialEmit(ctx, _content, _resources, changeEvents) {
            for (const changeEvent of changeEvents) {
                const ext = path.extname(changeEvent.path)
                if (ext === '.md') continue

                if (
                    changeEvent.type === 'add' ||
                    changeEvent.type === 'change'
                ) {
                    yield copyFile(ctx.argv, changeEvent.path)
                } else if (changeEvent.type === 'delete') {
                    const name = sluggifyFilePath(changeEvent.path)
                    const dest = joinSegments(ctx.argv.output, name) as FilePath
                    await fs.promises.unlink(dest)
                }
            }
        }
    }
}
