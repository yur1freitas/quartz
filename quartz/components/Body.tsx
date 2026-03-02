import {
    QuartzComponent,
    QuartzComponentConstructor,
    QuartzComponentProps
} from './types'
// @ts-ignore
import clipboardScript from './scripts/clipboard.inline'

import clipboardStyle from './styles/clipboard.scss'

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
    return <div id='quartz-body'>{children}</div>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor
