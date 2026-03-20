import path from 'node:path'
import { readFileSync } from 'node:fs'

/**
 * All constants relating to helpers or handlers
 */
export const ORIGIN_NAME = 'origin'
export const UPSTREAM_NAME = 'upstream'
export const QUARTZ_SOURCE_BRANCH = 'v4'

export const CWD = process.cwd()
export const CACHE_DIR = path.join(CWD, '.quartz-cache')

export const CACHE_FILE = './quartz/.quartz-cache/transpiled-build.mjs'
export const FILE_PATH = './quartz/build.ts'

export const { version: VERSION } = JSON.parse(
    readFileSync('./package.json').toString()
)

export const CONTENT_CACHE_FOLDER = path.join(CACHE_DIR, 'content-cache')
