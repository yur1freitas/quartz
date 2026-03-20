import { styleText } from 'node:util'
import { rm, cp } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'

import { isCancel, outro } from '@clack/prompts'

import { CONTENT_CACHE_FOLDER } from './consts.js'

export function escapePath(fp) {
    return fp
        .replace(/\\ /g, ' ') // unescape spaces
        .replace(/^"(.*)"$/, '$1')
        .replace(/^'(.*)'$/, '$1')
        .trim()
}

export function exitIfCancel(val) {
    if (isCancel(val)) {
        outro(styleText('red', 'Exiting'))
        process.exit(0)
    } else {
        return val
    }
}

export async function stashContentFolder(contentFolder) {
    await rm(CONTENT_CACHE_FOLDER, { force: true, recursive: true })

    await cp(contentFolder, CONTENT_CACHE_FOLDER, {
        force: true,
        recursive: true,
        verbatimSymlinks: true,
        preserveTimestamps: true
    })

    await rm(contentFolder, { force: true, recursive: true })
}

export function gitPull(origin, branch) {
    const flags = [
        '--no-rebase',
        '--autostash',
        '-s',
        'recursive',
        '-X',
        'ours',
        '--no-edit'
    ]

    const out = spawnSync('git', ['pull', ...flags, origin, branch], {
        stdio: 'inherit'
    })

    if (out.stderr) {
        throw new Error(
            styleText('red', `Error while pulling updates: ${out.stderr}`)
        )
    } else if (out.status !== 0) {
        throw new Error(styleText('red', 'Error while pulling updates'))
    }
}

export async function popContentFolder(contentFolder) {
    await rm(contentFolder, { force: true, recursive: true })

    await cp(CONTENT_CACHE_FOLDER, contentFolder, {
        force: true,
        recursive: true,
        verbatimSymlinks: true,
        preserveTimestamps: true
    })

    await rm(CONTENT_CACHE_FOLDER, { force: true, recursive: true })
}
