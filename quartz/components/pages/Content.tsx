import type { ComponentChildren } from 'preact'

import type {
    QuartzComponent,
    QuartzComponentConstructor,
    QuartzComponentProps
} from '~/types/jsx'

import { htmlToJsx } from '~/utils/jsx/htmlToJsx'

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
    const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren

    const classes: string[] = fileData.frontmatter?.cssclasses ?? []
    const classString = ['popover-hint', ...classes].join(' ')

    return <article class={classString}>{content}</article>
}

export default (() => Content) satisfies QuartzComponentConstructor
