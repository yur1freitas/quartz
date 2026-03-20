import { styleText } from 'node:util'

import type { Promise as WorkerPromise } from 'workerpool'

import workerpool from 'workerpool'

import type { MarkdownContent, ProcessedContent } from '~/types/vfile'
import type { FilePath } from '~/types/path'
import type { BuildCtx, WorkerSerializableBuildCtx } from '~/types/ctx'

import { QuartzLogger } from '~/utils/models/QuartzLogger'
import { PerfTimer } from '~/utils/models/PerfTime'
import { clamp } from '~/utils/clamp'
import { chunks } from '~/utils/chunks'

import { transpileWorkerScript } from './transpileWorkerScript'
import { createMarkdownProcessor } from './createMarkdownProcessor'
import { createMarkdownParser } from './createMarkdownParser'
import { createHtmlProcessor } from './createHtmlProcessor'
import { createFileParser } from './createFileParser'

export async function parseMarkdown(
    ctx: BuildCtx,
    filePaths: FilePath[]
): Promise<ProcessedContent[]> {
    const { argv } = ctx

    const perf = new PerfTimer()
    const log = new QuartzLogger(argv.verbose)

    // rough heuristics: 128 gives enough time for v8 to JIT and optimize parsing code paths
    const CHUNK_SIZE = 128
    const concurrency =
        ctx.argv.concurrency ?? clamp(filePaths.length / CHUNK_SIZE, 1, 4)

    let res: ProcessedContent[] = []
    log.start(`Parsing input files using ${concurrency} threads`)
    if (concurrency === 1) {
        try {
            const mdRes = await createFileParser(
                ctx,
                filePaths
            )(createMarkdownProcessor(ctx))
            res = await createMarkdownParser(
                ctx,
                mdRes
            )(createHtmlProcessor(ctx))
        } catch (error) {
            log.end()
            throw error
        }
    } else {
        await transpileWorkerScript()

        const pool = workerpool.pool('./quartz/bootstrap-worker.mjs', {
            minWorkers: 'max',
            maxWorkers: concurrency,
            workerType: 'thread'
        })
        const errorHandler = (err: any) => {
            console.error(err)
            process.exit(1)
        }

        const serializableCtx: WorkerSerializableBuildCtx = {
            buildId: ctx.buildId,
            argv: ctx.argv,
            allSlugs: ctx.allSlugs,
            allFiles: ctx.allFiles,
            incremental: ctx.incremental
        }

        const textToMarkdownPromises: WorkerPromise<MarkdownContent[]>[] = []
        let processedFiles = 0
        for (const chunk of chunks(filePaths, CHUNK_SIZE)) {
            textToMarkdownPromises.push(
                pool.exec('parseMarkdown', [serializableCtx, chunk])
            )
        }

        const mdResults: Array<MarkdownContent[]> = await Promise.all(
            textToMarkdownPromises.map(async (promise) => {
                const result = await promise
                processedFiles += result.length
                log.updateText(
                    `text->markdown ${styleText('gray', `${processedFiles}/${filePaths.length}`)}`
                )
                return result
            })
        ).catch(errorHandler)

        const markdownToHtmlPromises: WorkerPromise<ProcessedContent[]>[] = []
        processedFiles = 0
        for (const mdChunk of mdResults) {
            markdownToHtmlPromises.push(
                pool.exec('processHtml', [serializableCtx, mdChunk])
            )
        }
        const results: ProcessedContent[][] = await Promise.all(
            markdownToHtmlPromises.map(async (promise) => {
                const result = await promise
                processedFiles += result.length
                log.updateText(
                    `markdown->html ${styleText('gray', `${processedFiles}/${filePaths.length}`)}`
                )
                return result
            })
        ).catch(errorHandler)

        res = results.flat()
        await pool.terminate()
    }

    log.end(`Parsed ${res.length} Markdown files in ${perf.timeSince()}`)
    return res
}
