import { ComponentType, JSX } from 'preact'
import { Node } from 'hast'

import { StaticResources, StringResource } from '../util/resources'
import { BuildCtx } from '../util/ctx'
import { QuartzPluginData } from '../plugins/vfile'
import { GlobalConfiguration } from '../cfg'

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

export type QuartzComponent = ComponentType<QuartzComponentProps> & {
    css?: StringResource
    beforeDOMLoaded?: StringResource
    afterDOMLoaded?: StringResource
}

export type QuartzComponentConstructor<
    Options extends object | undefined = undefined
> = (opts: Options) => QuartzComponent
