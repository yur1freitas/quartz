import sharp from 'sharp'

import type { QuartzEmitterPlugin } from '~/types/plugins'
import type { FullSlug } from '~/types/path'
import type { BuildCtx } from '~/types/ctx'

import { joinSegments } from '~/utils/path/joinSegments'
import { QUARTZ } from '~/consts'

import { write } from './helpers'

export const Favicon: QuartzEmitterPlugin = () => ({
    name: 'Favicon',
    async *emit({ argv }) {
        const iconPath = joinSegments(QUARTZ, 'static', 'icon.png')

        const faviconContent = sharp(iconPath).resize(48, 48).toFormat('png')

        yield write({
            ctx: { argv } as BuildCtx,
            slug: 'favicon' as FullSlug,
            ext: '.ico',
            content: faviconContent
        })
    },
    async *partialEmit() {}
})
