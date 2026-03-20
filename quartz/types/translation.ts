import type { FullSlug } from '~/types/path'
import type { CalloutTypes } from '~/types/callout'

export type CalloutTranslation = Record<CalloutTypes, string>

export interface Translation {
    propertyDefaults: {
        title: string
        description: string
    }
    direction?: 'ltr' | 'rtl'
    components: {
        callout: CalloutTranslation
        backlinks: {
            title: string
            noBacklinksFound: string
        }
        themeToggle: {
            lightMode: string
            darkMode: string
        }
        readerMode: {
            title: string
        }
        explorer: {
            title: string
        }
        footer: {
            createdWith: string
        }
        graph: {
            title: string
        }
        recentNotes: {
            title: string
            seeRemainingMore: (variables: { remaining: number }) => string
        }
        transcludes: {
            transcludeOf: (variables: { targetSlug: FullSlug }) => string
            linkToOriginal: string
        }
        search: {
            title: string
            searchBarPlaceholder: string
        }
        tableOfContents: {
            title: string
        }
        contentMeta: {
            readingTime: (variables: { minutes: number }) => string
        }
    }
    pages: {
        rss: {
            recentNotes: string
            lastFewNotes: (variables: { count: number }) => string
        }
        error: {
            title: string
            notFound: string
            home: string
        }
        folderContent: {
            folder: string
            itemsUnderFolder: (variables: { count: number }) => string
        }
        tagContent: {
            tag: string
            tagIndex: string
            itemsUnderTag: (variables: { count: number }) => string
            showingFirst: (variables: { count: number }) => string
            totalTags: (variables: { count: number }) => string
        }
    }
}
