import remarkBreaks from 'remark-breaks'

import type { QuartzTransformerPlugin } from '~/types/plugins'

export const HardLineBreaks: QuartzTransformerPlugin = () => {
    return {
        name: 'HardLineBreaks',
        markdownPlugins() {
            return [remarkBreaks]
        }
    }
}
