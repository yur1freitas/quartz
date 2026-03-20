import { slug as slugAnchor } from 'github-slugger'

export function splitAnchor(link: string): [string, string] {
    let [fp, anchor] = link.split('#', 2)

    if (fp.endsWith('.pdf')) {
        return [fp, anchor === undefined ? '' : `#${anchor}`]
    }

    anchor = anchor === undefined ? '' : '#' + slugAnchor(anchor)

    return [fp, anchor]
}
