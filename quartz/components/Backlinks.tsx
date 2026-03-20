import type {
    QuartzComponent,
    QuartzComponentConstructor,
    QuartzComponentProps
} from '~/types/jsx'

import { simplifySlug } from '~/utils/path/simplifySlug'
import { resolveRelative } from '~/utils/path/resolveRelative'
import { classNames } from '~/utils/classNames'

import { i18n } from '../i18n'

import style from './styles/backlinks.scss'
import OverflowListFactory from './OverflowList'

interface BacklinksOptions {
    hideWhenEmpty: boolean
}

const defaultOptions: BacklinksOptions = {
    hideWhenEmpty: true
}

export default ((opts?: Partial<BacklinksOptions>) => {
    const options: BacklinksOptions = { ...defaultOptions, ...opts }
    const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

    const Backlinks: QuartzComponent = ({
        fileData,
        allFiles,
        displayClass,
        cfg
    }: QuartzComponentProps) => {
        const slug = simplifySlug(fileData.slug!)
        const backlinkFiles = allFiles.filter((file) =>
            file.links?.includes(slug)
        )

        if (options.hideWhenEmpty && backlinkFiles.length == 0) {
            return null
        }

        return (
            <div class={classNames(displayClass, 'backlinks')}>
                <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
                <OverflowList>
                    {backlinkFiles.length > 0 ? (
                        backlinkFiles.map((f) => (
                            <li>
                                <a
                                    href={resolveRelative(
                                        fileData.slug!,
                                        f.slug!
                                    )}
                                    class='internal'
                                >
                                    {f.frontmatter?.title}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li>
                            {
                                i18n(cfg.locale).components.backlinks
                                    .noBacklinksFound
                            }
                        </li>
                    )}
                </OverflowList>
            </div>
        )
    }

    Backlinks.css = style
    Backlinks.afterDOMLoaded = overflowListAfterDOMLoaded

    return Backlinks
}) satisfies QuartzComponentConstructor
