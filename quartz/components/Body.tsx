import type {
    QuartzComponent,
    QuartzComponentConstructor,
    QuartzComponentProps
} from '~/types/jsx'

import clipboardStyle from './styles/clipboard.scss'
// @ts-ignore
import clipboardScript from './scripts/clipboard.inline'

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
    return <div id='quartz-body'>{children}</div>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor
