import path from 'node:path'

import { build } from 'esbuild'

import { QUARTZ } from '~/consts'

export async function transpileWorkerScript() {
    // transpile worker script
    const cacheFile = './.quartz-cache/transpiled-worker.mjs'
    const filePath = './quartz/worker.ts'

    return build({
        entryPoints: [filePath],
        outfile: path.join(QUARTZ, cacheFile),
        bundle: true,
        keepNames: true,
        platform: 'node',
        format: 'esm',
        packages: 'external',
        sourcemap: true,
        sourcesContent: false,
        plugins: [
            {
                name: 'css-and-scripts-as-text',
                setup(build) {
                    build.onLoad({ filter: /\.scss$/ }, (_) => ({
                        contents: '',
                        loader: 'text'
                    }))
                    build.onLoad({ filter: /\.inline\.(ts|js)$/ }, (_) => ({
                        contents: '',
                        loader: 'text'
                    }))
                }
            }
        ]
    })
}
