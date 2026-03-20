import type {
    QuartzComponent,
    QuartzComponentConstructor,
    QuartzComponentProps
} from '~/types/jsx'

import { pathToRoot } from '~/utils/path/pathToRoot'
import { classNames } from '~/utils/classNames'

import { i18n } from '../i18n'

const PageTitle: QuartzComponent = ({
    fileData,
    cfg,
    displayClass
}: QuartzComponentProps) => {
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
    const baseDir = pathToRoot(fileData.slug!)
    return (
        <h2 class={classNames(displayClass, 'page-title')}>
            <a href={baseDir}>{title}</a>
        </h2>
    )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
