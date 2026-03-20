import { toCodePoint } from './toCodePoint'

const U200D = String.fromCharCode(8205)
const UFE0Fg = /\uFE0F/g

export function getIconCode(char: string): string {
    return toCodePoint(
        char.indexOf(U200D) < 0 ? char.replace(UFE0Fg, '') : char
    )
}
