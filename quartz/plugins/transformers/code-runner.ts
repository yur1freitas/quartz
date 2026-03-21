import type { BuiltinTheme } from 'shiki'
import type { Root } from 'mdast'

import { visit } from 'unist-util-visit'

import type { QuartzTransformerPlugin } from '~/types/plugins'

import { loadShikiTheme } from '~/utils/theme/loadShikiTheme'
import codeRunnerStyles from '~/styles/code-runner.scss'
import lucideScript from '~/components/scripts/lucide.inline'
import codeRunnerScript from '~/components/scripts/code-runner.inline'

export interface Options {
    theme: {
        dark: BuiltinTheme
        light: BuiltinTheme
    }
}

export const SUPPORTED_LANGUAGES = ['python'] as const

export const META_OPTION = 'showCodeRunner'

export const DEFAULT_OPTIONS: Required<Options> = {
    theme: {
        dark: 'github-dark',
        light: 'github-light'
    }
}

export const CodeRunner: QuartzTransformerPlugin = (opts?: Options) => {
    return {
        name: 'CodeRunner',
        markdownPlugins() {
            const plugin = (tree: Root) => {
                visit(tree, 'code', (node, index, parent) => {
                    if (
                        !SUPPORTED_LANGUAGES.includes(node.lang) ||
                        node.meta !== META_OPTION
                    )
                        return

                    if (parent?.children && typeof index !== 'undefined') {
                        const newNode = {
                            type: 'html',
                            value: `
                            <div class="code-runner">
                                <div class="code-runner__header">
                                    <div class="code-runner__language">${node.lang}</div>
                                    <div class="code-runner__actions">
                                      <button class="code-runner__action" data-action="copy" data-copied="false">
                                        <i data-lucide="copy"></i>
                                        <i data-lucide="check"></i>
                                      </button>
                                      <button class="code-runner__action" data-action="run">
                                        <i data-lucide="play"></i>
                                      </button>
                                      <button class="code-runner__action" data-action="collapse">
                                        <i data-lucide="chevron-down"></i>
                                      </button>
                                    </div>
                                </div>
                                <div class="code-runner__editor">
                                    <textarea class="code-runner__textarea">${node.value}</textarea>
                                </div>
                                <div class="code-runner__output"></div>
                            </div>
                          `
                        }

                        parent.children.splice(index, 1, newNode)
                        return index + 1
                    }
                })
            }

            return [() => plugin]
        },
        externalResources() {
            const { light, dark } = { ...DEFAULT_OPTIONS.theme, ...opts?.theme }

            const lightTheme = loadShikiTheme(light)
            const darkTheme = loadShikiTheme(dark)

            const script = `;(() => {
                window.lightCodeMirrorTheme = ${JSON.stringify(lightTheme, null, 0)}
                window.darkCodeMirrorTheme = ${JSON.stringify(darkTheme, null, 0)}
            })()`

            return {
                css: [
                    {
                        content: codeRunnerStyles,
                        inline: true
                    }
                ],
                js: [
                    {
                        script: script,
                        loadTime: 'afterDOMReady',
                        contentType: 'inline'
                    },
                    {
                        src: 'https://cdn.jsdelivr.net/npm/pyodide@0.29.3/pyodide.min.js',
                        loadTime: 'afterDOMReady',
                        contentType: 'external'
                    },
                    {
                        script: lucideScript,
                        loadTime: 'afterDOMReady',
                        contentType: 'inline'
                    },
                    {
                        script: codeRunnerScript,
                        loadTime: 'afterDOMReady',
                        contentType: 'inline'
                    }
                ]
            }
        }
    }
}
