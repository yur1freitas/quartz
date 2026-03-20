import path from 'node:path'

import { globby } from 'globby'

import { FilePath } from '~/types/path'

export function toPosixPath(filePath: string): string {
    return filePath.split(path.sep).join('/')
}

export async function glob(
    pattern: string,
    cwd: string,
    ignorePatterns: string[]
): Promise<FilePath[]> {
    const filePaths = (
        await globby(pattern, {
            cwd,
            ignore: ignorePatterns,
            gitignore: true
        })
    ).map(toPosixPath)

    return filePaths as FilePath[]
}
