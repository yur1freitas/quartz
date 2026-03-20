import type { QuartzComponent } from './jsx'

export interface FullPageLayout {
    head: QuartzComponent
    header: QuartzComponent[]
    beforeBody: QuartzComponent[]
    pageBody: QuartzComponent
    afterBody: QuartzComponent[]
    left: QuartzComponent[]
    right: QuartzComponent[]
    footer: QuartzComponent
}

export type PageLayout = Pick<FullPageLayout, 'beforeBody' | 'left' | 'right'>

export type SharedLayout = Pick<
    FullPageLayout,
    'head' | 'header' | 'footer' | 'afterBody'
>
