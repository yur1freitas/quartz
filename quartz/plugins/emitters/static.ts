import { dirname } from 'path'
import fs from 'fs'

import { QuartzEmitterPlugin } from '../types'
import { FilePath, QUARTZ, joinSegments } from '../../util/path'
import { glob } from '../../util/glob'

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
        await fs.promises.mkdir(outputStaticPath, { recursive: true })
        for (const fp of fps) {
            const src = joinSegments(staticPath, fp) as FilePath
            const dest = joinSegments(outputStaticPath, fp) as FilePath
            await fs.promises.mkdir(dirname(dest), { recursive: true })
            await fs.promises.copyFile(src, dest)
            yield dest
        }
    },
    async *partialEmit() {}
})
