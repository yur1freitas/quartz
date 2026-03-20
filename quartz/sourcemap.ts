import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

import type sourceMapSupport from 'source-map-support'

export const sourceMapOptions: sourceMapSupport.Options = {
    // source map hack to get around query param
    // import cache busting
    retrieveSourceMap(source) {
        if (source.includes('.quartz-cache')) {
            let realSource = fileURLToPath(source.split('?', 2)[0] + '.map')
            return {
                map: readFileSync(realSource, 'utf8')
            }
        } else {
            return null
        }
    }
}
