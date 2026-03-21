import type { PyodideAPI } from 'pyodide'

import { EditorView, basicSetup } from 'codemirror'
import { EditorState, Compartment } from '@codemirror/state'
import { python } from '@codemirror/lang-python'

import { convertShikiTheme } from '~/utils/theme/convertShikiTheme'
import { debounce } from '~/utils/debounce'

declare global {
    const loadPyodide: typeof import('pyodide').loadPyodide

    interface Window {
        lightCodeMirrorTheme: Record<string, any>
        darkCodeMirrorTheme: Record<string, any>
    }
}

;(async () => {
    let pyodideOutput: string = ''
    let pyodideIsRunning: boolean = false
    let pyodideInstance: PyodideAPI | null = null

    const editors = new Set<EditorView>()
    const themeEditor = new Compartment()

    const { lightCodeMirrorTheme, darkCodeMirrorTheme } = window

    const lightTheme = convertShikiTheme(lightCodeMirrorTheme)
    const darkTheme = convertShikiTheme(darkCodeMirrorTheme)

    const initialTheme =
        document.documentElement.getAttribute('saved-theme') === 'dark'
            ? darkTheme
            : lightTheme

    document.addEventListener('themechange', (event) => {
        const newTheme = event.detail.theme === 'dark' ? darkTheme : lightTheme
        const effects = themeEditor.reconfigure(newTheme)

        for (const editor of editors) {
            editor.dispatch({ effects })
        }
    })

    const getPyodide = async (): Promise<PyodideAPI> => {
        if (pyodideInstance) return pyodideInstance

        pyodideInstance = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/',
            packages: ['numpy', 'pandas'],
            stdout: (msg) => {
                pyodideOutput += `${msg}\n`
            },
            stderr: (msg) => {
                pyodideOutput += `${msg}\n`
            }
        })

        return pyodideInstance
    }

    const getCopyButton = (codeRunner: Element): HTMLButtonElement | null => {
        return codeRunner.querySelector(
            '.code-runner__action[data-action="copy"]'
        )
    }

    const getRunButton = (codeRunner: Element): HTMLButtonElement | null => {
        return codeRunner.querySelector(
            '.code-runner__action[data-action="run"]'
        )
    }

    const getCollapseButton = (codeRunner: Element): HTMLElement | null => {
        return codeRunner.querySelector(
            '.code-runner__action[data-action="collapse"]'
        )
    }

    const getTextarea = (codeRunner: Element): HTMLTextAreaElement | null => {
        return codeRunner.querySelector('.code-runner__textarea')
    }

    const getOutput = (codeRunner: Element): HTMLElement | null => {
        return codeRunner.querySelector('.code-runner__output')
    }

    const setupCopyButton = (
        copyBtn: HTMLElement,
        editor: EditorView
    ): void => {
        const resetAttribute = debounce({
            delay: 1000,
            callback: () => {
                copyBtn.setAttribute('data-copied', 'false')
            }
        })

        copyBtn.onclick = async () => {
            const code = editor.state.doc.toString()
            await navigator.clipboard.writeText(code)

            copyBtn.setAttribute('data-copied', 'true')
            resetAttribute()
        }
    }

    const setupRunButton = (
        runBtn: HTMLElement,
        output: HTMLElement,
        editor: EditorView
    ): void => {
        runBtn.onclick = async () => {
            try {
                if (pyodideIsRunning) {
                    output.innerText =
                        'Têm um código em execução. Espere até que termine para executar outro'
                    return
                }

                output.setAttribute('data-state', 'running')

                pyodideOutput = ''
                pyodideIsRunning = true

                const code = editor.state.doc.toString()

                const pyodide = await getPyodide()
                await pyodide.runPythonAsync(code)

                output.setAttribute('data-state', 'success')

                output.innerText = pyodideOutput
                pyodideIsRunning = false
            } catch (error) {
                if (Error.isError(error)) {
                    output.setAttribute('data-state', 'error')

                    output.innerText = `- - ERROR - -\n\n${error.message}`
                    pyodideIsRunning = false
                }
            }
        }
    }

    const setupCollapseButton = (
        collapseBtn: HTMLElement,
        codeRunner: HTMLElement
    ): void => {
        collapseBtn.onclick = async () => {
            codeRunner.toggleAttribute('data-collapsed')
        }
    }

    const setupCodeRunners = (): void => {
        editors.clear()

        const codeRunners = document.querySelectorAll(
            '.code-runner'
        ) as NodeListOf<HTMLElement>

        for (const codeRunner of codeRunners) {
            const copyBtn = getCopyButton(codeRunner)
            const runBtn = getRunButton(codeRunner)
            const collapseBtn = getCollapseButton(codeRunner)

            const textarea = getTextarea(codeRunner)
            const output = getOutput(codeRunner)

            if (!copyBtn || !runBtn || !collapseBtn || !textarea || !output) {
                continue
            }

            const textareaParent = textarea.parentElement ?? document.body

            const state = EditorState.create({
                doc: textarea.value,
                extensions: [basicSetup, python(), themeEditor.of(initialTheme)]
            })

            const editor = new EditorView({
                state,
                parent: textareaParent
            })

            editors.add(editor)

            textarea.style.display = 'none'

            setupCopyButton(copyBtn, editor)
            setupRunButton(runBtn, output, editor)
            setupCollapseButton(collapseBtn, codeRunner)
        }
    }

    document.addEventListener('nav', setupCodeRunners)
})()
