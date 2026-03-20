export type Analytics =
    | null
    | {
          provider: 'plausible'
          host?: string
      }
    | {
          provider: 'google'
          tagId: string
      }
    | {
          provider: 'umami'
          websiteId: string
          host?: string
      }
    | {
          provider: 'goatcounter'
          websiteId: string
          host?: string
          scriptSrc?: string
      }
    | {
          provider: 'posthog'
          apiKey: string
          host?: string
      }
    | {
          provider: 'tinylytics'
          siteId: string
      }
    | {
          provider: 'cabin'
          host?: string
      }
    | {
          provider: 'clarity'
          projectId?: string
      }
    | {
          provider: 'matomo'
          host: string
          siteId: string
      }
    | {
          provider: 'vercel'
      }
    | {
          provider: 'rybbit'
          siteId: string
          host?: string
      }
