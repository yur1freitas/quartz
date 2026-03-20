export type FontSpecification =
    | string
    | {
          name: string
          weights?: number[]
          includeItalic?: boolean
      }

export interface GoogleFontFile {
    url: string
    filename: string
    extension: string
}
