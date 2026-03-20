import type { QuartzConfig } from './quartz/types/config'

import * as Plugin from './quartz/plugins'

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
    configuration: {
        pageTitle: 'Quartz 4',
        pageTitleSuffix: '',
        enableSPA: true,
        enablePopovers: true,
        analytics: {
            provider: 'plausible'
        },
        locale: 'en-US',
        baseUrl: 'quartz.jzhao.xyz',
        ignorePatterns: ['private', 'templates', '.obsidian'],
        defaultDateType: 'modified',
        theme: {
            fontOrigin: 'googleFonts',
            cdnCaching: true,
            typography: {
                header: 'Schibsted Grotesk',
                body: 'Recursive',
                code: 'IBM Plex Mono'
            },
            colors: {
                lightMode: {
                    highlight: '#64748b',
                    textHighlight: '#fff23688',

                    border: 'rgba(0, 0, 0, 0.1)',

                    foreground: '#27272a',
                    background: '#fefefe',

                    link: '#64748b',
                    linkHover: '#526077',

                    red: '#e11d48',
                    orange: ' #ea580c',
                    yellow: '#eab308',
                    lime: '#84cc16',
                    green: ' #22c55e',
                    cyan: '#2dd4bf',

                    calloutPadding: '1rem',
                    calloutBorderRadius: '0.5rem',
                    calloutContentBackground: '#eeeef0',

                    shadow: 'inset 0 -0.15rem 0.25rem 0.05rem rgba(0, 0, 0, 0.05)'
                },
                darkMode: {
                    highlight: '#cbd5e1',
                    textHighlight: '#b3aa0288',

                    border: 'rgba(255, 255, 255, 0.05)',

                    foreground: '#f1f5f9;',
                    background: '#0f0f0f',

                    link: '#cbd5e1',
                    linkHover: '#b9c7d7',

                    red: '#f43f5e',
                    orange: '#fdba74',
                    yellow: '#fde68a',
                    lime: '#d9f99d',
                    green: '#bbf7d0',
                    cyan: '#a5f3fc',

                    calloutPadding: '1rem',
                    calloutBorderRadius: '0.5rem',
                    calloutContentBackground: '#18181b',

                    shadow: 'inset 0 -0.15rem 0.25rem 0.05rem rgba(0, 0, 0, 0.15)'
                }
            }
        }
    },
    plugins: {
        transformers: [
            Plugin.FrontMatter(),
            Plugin.CreatedModifiedDate({
                priority: ['frontmatter', 'git', 'filesystem']
            }),
            Plugin.SyntaxHighlighting({
                theme: {
                    light: 'github-light',
                    dark: 'github-dark'
                },
                keepBackground: false
            }),
            Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
            Plugin.GitHubFlavoredMarkdown(),
            Plugin.TableOfContents(),
            Plugin.CrawlLinks({ markdownLinkResolution: 'shortest' }),
            Plugin.Description(),
            Plugin.Latex({ renderEngine: 'katex' })
        ],
        filters: [Plugin.RemoveDrafts()],
        emitters: [
            Plugin.AliasRedirects(),
            Plugin.ComponentResources(),
            Plugin.ContentPage(),
            Plugin.FolderPage(),
            Plugin.TagPage(),
            Plugin.ContentIndex({
                enableSiteMap: true,
                enableRSS: true
            }),
            Plugin.Assets(),
            Plugin.Static(),
            Plugin.Favicon(),
            Plugin.NotFoundPage(),
            // Comment out CustomOgImages to speed up build time
            Plugin.CustomOgImages()
        ]
    }
}

export default config
