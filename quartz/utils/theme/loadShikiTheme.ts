import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'

import type { BuiltinTheme } from 'shiki'

const require = createRequire(import.meta.url)

export function loadShikiTheme(name: BuiltinTheme): object {
    const mod = require(`shiki/themes/${name}.mjs`)

    return Object.hasOwn(mod, 'default') ? mod.default : mod
}
