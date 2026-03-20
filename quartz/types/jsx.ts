import type { ComponentType, JSX } from 'preact'

import type { QuartzPluginData } from './vfile'
import type { StaticResources, StringResource } from './resources'
import type { BuildCtx } from './ctx'
import type { GlobalConfiguration } from './config'

export type QuartzComponent = ComponentType<QuartzComponentProps> & {
    css?: StringResource
    beforeDOMLoaded?: StringResource
    afterDOMLoaded?: StringResource
}

export type QuartzComponentConstructor<
    Options extends object | undefined = undefined
> = (opts: Options) => QuartzComponent

export type QuartzComponentProps = {
    ctx: BuildCtx
    externalResources: StaticResources
    fileData: QuartzPluginData
    cfg: GlobalConfiguration
    children: (QuartzComponent | JSX.Element)[]
    tree: Node
    allFiles: QuartzPluginData[]
    displayClass?: 'mobile-only' | 'desktop-only'
} & JSX.IntrinsicAttributes & {
        [key: string]: any
    }
