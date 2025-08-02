import { z } from 'zod'

const authorSchema = z.object({
  name: z
    .string()
    .min(1, 'Author name is required')
    .max(50, 'Author name must be less than 50 characters')
    .describe('Author name'),
  link: z
    .url('Author link must be a valid URL')
    .describe('Author link, such as portfolio, blog, GitHub, etc.'),
})

// Simplified BCP 47 validator for common cases
const langTagRegex = /^[a-z]{2,3}(-[a-z]{2,8}){0,2}$/i

const creativeCommonsSchema = z.object({
  type: z
    .string()
    .min(1, 'Creative Commons type is required')
    .describe('Creative Commons type'),
  link: z
    .url('Creative Commons link must be a valid URL')
    .describe('Creative Commons link'),
})

const headLinkSchema = z.object({
  rel: z.string().describe('The rel attribute of the link tag'),
  type: z.string().optional().describe('The type attribute of the link tag'),
  href: z.string().describe('The href attribute of the link tag'),
  sizes: z.string().optional().describe('The sizes attribute of the link tag'),
})

const StrOrNum = z
  .union([z.string(), z.number()])
  .transform(val => String(val).trim())
const optionalStrOrNum = StrOrNum.nullable().optional().default(null)

const anilistAnimeNameStyleSchema = z.enum(['romaji', 'english', 'native']).nullable().optional().default(null)

const socialMediaSchema = z.object({
  github_username: optionalStrOrNum,
  linkedin_username: optionalStrOrNum,
  instagram_id: optionalStrOrNum,
  orcid_id: z
    .string()
    .regex(
      /^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/,
      'Invalid ORCID iD format. Expected: 0000-0000-0000-0000',
    )
    .optional()
    .nullable()
    .default(null),
  telegram_username: optionalStrOrNum,
  bluesky_username: optionalStrOrNum,
  youtube_id: optionalStrOrNum,
  zhihu_username: optionalStrOrNum,
  bilibili_id: optionalStrOrNum,
  email: z.email('Email must be a valid email address').optional().nullable().default(null),
  rss: z.boolean().nullable().optional().default(null).describe('Whether to display the RSS icon, leave empty to fully disable the RSS feed'),
})

export const userConfigSchema = z.object({
  title: StrOrNum.describe('Site title'),
  subTitle: StrOrNum.describe('Site subtitle'),
  description: StrOrNum.describe('Site description'),
  keywords: optionalStrOrNum.describe('Site keywords'),
  author: authorSchema,
  lang: z
    .string()
    .regex(langTagRegex, 'Language must be an BCP 47 tag')
    .describe('Site language in BCP 47 format like "en", "zh-CN", or "zh-Hans".')
    .default('en'),
  siteUrl: z
    .url()
    .transform(val => val.replace(/\/+$/, ''))
    .describe('Site URL without trailing slash'),

  avatar: z.string().describe('Site avatar'),
  background: z.string().describe('Site background'),
  slogan: z.string().max(100, 'Slogan must be less than 100 characters').describe('Site slogan on homepage'),
  googleAnalytics: z
    .string()
    .regex(
      /^(G|UA|YT|MO)-[a-zA-Z0-9-]+$/,
      'Google Analytics ID must be in the coorect format',
    )
    .nullable()
    .optional()
    .default(null),
  // Icons settings
  links: z.array(headLinkSchema).optional().default([]),
  // Posts settings
  postsPerPage: z
    .number()
    .int()
    .min(1, 'Posts per page must be greater than 0')
    .max(15, 'Posts per page must be less than 15')
    .nullable()
    .optional()
    .default(5)
    .describe('Posts per page'),
  creativeCommons: creativeCommonsSchema,
  // Header settings
  travellings: z
    .boolean()
    .describe('Whether to display the travellings icon on the homepage')
    .nullable()
    .optional()
    .default(null)
    .describe('Whether to display the travellings icon on the homepage'),
  // Footer settings
  startYear: z
    .number()
    .int()
    .min(1900, 'This cannot be true, you really started your blog before 1900?')
    .max(new Date().getFullYear(), 'Start year must be less than or equal to current year')
    .nullable()
    .optional()
    .default(null)
    .describe('Start year of the blog that will be displayed on the footer'),
  // Pages settings
  anilist_username: optionalStrOrNum.describe('AniList username'),
  anilist_anime_name_style: anilistAnimeNameStyleSchema,
  // Social media
  socialMedia: socialMediaSchema,
  // Comments
  twikooEnvId: z.url('Twikoo environment ID must be a valid URL').transform(val => val.trim()).nullable().optional().default(null),
  disqusShortname: z.string().transform(val => val.trim()).nullable().optional().default(null),

  // Custom code blocks
  headerJavascript: z
    .array(z.string())
    .optional()
    .default([])
    .describe('Custom JavaScript code to be included inside the <head> section of your site. One script url per line. Could be a CDN or a local file.'),
  slotFooter: z
    .string()
    .transform(val => val.trim())
    .nullable()
    .optional()
    .describe('Custom HTML code to be included inside the <footer> section of your site.')
    .default(null),
})

export type SocialMediaKey = keyof typeof socialMediaSchema.shape
export type SocialMedia = z.infer<typeof socialMediaSchema>
export type UserConfig = z.infer<typeof userConfigSchema>
export type HeadLink = z.infer<typeof headLinkSchema>
export type AnilistAnimeNameStyle = z.infer<typeof anilistAnimeNameStyleSchema>
