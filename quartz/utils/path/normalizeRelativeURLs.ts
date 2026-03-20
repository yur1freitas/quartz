import { rebaseHtmlElement } from './rebaseHtmlElement'

export function normalizeRelativeURLs(
    el: Element | Document,
    destination: string | URL
) {
    el.querySelectorAll('[href=""], [href^="./"], [href^="../"]').forEach(
        (item) => rebaseHtmlElement(item, 'href', destination)
    )
    el.querySelectorAll('[src=""], [src^="./"], [src^="../"]').forEach((item) =>
        rebaseHtmlElement(item, 'src', destination)
    )
}
