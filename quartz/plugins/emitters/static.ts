import { dirname } from 'node:path'
import { mkdir, copyFile } from 'node:fs/promises'

import type { QuartzEmitterPlugin } from '~/types/plugins'
import type { FilePath } from '~/types/path'

import { joinSegments } from '~/utils/path/joinSegments'
import { glob } from '~/utils/glob'
import { QUARTZ } from '~/consts'

export const Static: QuartzEmitterPlugin = () => ({
    name: 'Static',
    async *emit({ argv, cfg }) {
        const staticPath = joinSegments(QUARTZ, 'static')

        const fps = await glob(
            '**',
            staticPath,
            cfg.configuration.ignorePatterns
        )

        const outputStaticPath = joinSegments(argv.output, 'static')

        await mkdir(outputStaticPath, { recursive: true })

        for (const fp of fps) {
            const src = joinSegments(staticPath, fp) as FilePath
            const dest = joinSegments(outputStaticPath, fp) as FilePath
            await mkdir(dirname(dest), { recursive: true })
            await copyFile(src, dest)
            yield dest
        }
    },
    async *partialEmit() {}
})
