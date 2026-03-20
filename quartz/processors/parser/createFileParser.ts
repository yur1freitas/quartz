import path from 'node:path'

import { read } from 'to-vfile'

import type { MarkdownContent } from '~/types/vfile'
import type { FilePath } from '~/types/path'
import type { BuildCtx } from '~/types/ctx'

import { trace } from '~/utils/trace'
import { sluggifyFilePath } from '~/utils/path/sluggifyFilePath'
import { PerfTimer } from '~/utils/models/PerfTime'

import type { QuartzMdProcessor } from './createMarkdownProcessor'

export function createFileParser(ctx: BuildCtx, filePaths: FilePath[]) {
    const { argv, cfg } = ctx

    return async (processor: QuartzMdProcessor) => {
        const res: MarkdownContent[] = []
        for (const fp of filePaths) {
            try {
                const perf = new PerfTimer()
                const file = await read(fp)

                // strip leading and trailing whitespace
                file.value = file.value.toString().trim()

                // Text -> Text transforms
                for (const plugin of cfg.plugins.transformers.filter(
                    (p) => p.textTransform
                )) {
                    file.value = plugin.textTransform!(
                        ctx,
                        file.value.toString()
                    )
                }

                // base data properties that plugins may use
                file.data.filePath = file.path as FilePath
                file.data.relativePath = path.posix.relative(
                    argv.directory,
                    file.path
                ) as FilePath
                file.data.slug = sluggifyFilePath(file.data.relativePath)

                const ast = processor.parse(file)
                const newAst = await processor.run(ast, file)
                res.push([newAst, file])

                if (argv.verbose) {
                    console.log(
                        `[markdown] ${fp} -> ${file.data.slug} (${perf.timeSince()})`
                    )
                }
            } catch (err) {
                trace(`\nFailed to process markdown \`${fp}\``, err as Error)
            }
        }

        return res
    }
}
