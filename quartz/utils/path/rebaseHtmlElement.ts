// from micromorph/src/utils.ts
// https://github.com/natemoo-re/micromorph/blob/main/src/utils.ts#L5
export function rebaseHtmlElement(
    el: Element,
    attr: string,
    newBase: string | URL
): void {
    const rebased = new URL(el.getAttribute(attr)!, newBase)
    el.setAttribute(attr, rebased.pathname + rebased.hash)
}
