import type { Locales } from '~/types/locales'

import { formatDate } from '~/utils/date/formatDate'

interface Props {
    date: Date
    locale?: Locales
}

export function Date({ date, locale }: Props) {
    return <time datetime={date.toISOString()}>{formatDate(date, locale)}</time>
}
