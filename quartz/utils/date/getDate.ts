import type { QuartzPluginData } from '~/types/vfile'
import type { GlobalConfiguration } from '~/types/config'

export function getDate(
    config: GlobalConfiguration,
    data: QuartzPluginData
): Date | undefined {
    if (!config.defaultDateType) {
        throw new Error(
            `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`
        )
    }

    return data.dates?.[config.defaultDateType]
}
