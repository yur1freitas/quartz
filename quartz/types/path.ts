/// Utility type to simulate nominal types in TypeScript
export type SlugLike<T> = string & { __brand: T }

/** Cannot be relative and must have a file extension. */
export type FilePath = SlugLike<'filepath'>

/** Can be found on `href`s but can also be constructed for client-side navigation (e.g. search and graph) */
export type RelativeURL = SlugLike<'relative'>

/** Cannot be relative and may not have leading or trailing slashes. It can have `index` as it's last segment. Use this wherever possible is it's the most 'general' interpretation of a slug. */
export type FullSlug = SlugLike<'full'>

/** Shouldn't be a relative path and shouldn't have `/index` as an ending or a file extension. It _can_ however have a trailing slash to indicate a folder path. */
export type SimpleSlug = SlugLike<'simple'>
