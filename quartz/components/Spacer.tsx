import type {
    QuartzComponentConstructor,
    QuartzComponentProps
} from '~/types/jsx'

import { classNames } from '~/utils/classNames'

function Spacer({ displayClass }: QuartzComponentProps) {
    return <div class={classNames(displayClass, 'spacer')}></div>
}

export default (() => Spacer) satisfies QuartzComponentConstructor
