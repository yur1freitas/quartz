import type { Locales } from '~/types/locales'

export function formatDate(date: Date, locale: Locales = 'en-US'): string {
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    })
}
