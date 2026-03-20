import type { JSX } from 'preact/jsx-runtime'

import type { QuartzPluginData } from './vfile'

export type JSResource = {
    loadTime: 'beforeDOMReady' | 'afterDOMReady'
    moduleType?: 'module'
    spaPreserve?: boolean
} & (
    | {
          src: string
          contentType: 'external'
      }
    | {
          script: string
          contentType: 'inline'
      }
)

export type CSSResource = {
    content: string
    inline?: boolean
    spaPreserve?: boolean
}

export interface StaticResources {
    css: CSSResource[]
    js: JSResource[]
    additionalHead: (
        | JSX.Element
        | ((pageData: QuartzPluginData) => JSX.Element)
    )[]
}

export type StringResource = string | string[] | undefined
