import type { QuartzFilterPlugin } from '~/types/plugins'

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
    name: 'RemoveDrafts',
    shouldPublish(_ctx, [_tree, vfile]) {
        const draftFlag: boolean =
            vfile.data?.frontmatter?.draft === true ||
            vfile.data?.frontmatter?.draft === 'true'
        return !draftFlag
    }
})
