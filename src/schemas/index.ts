import type { HeadLink, SocialMedia, SocialMediaKey, UserConfig } from './config'
import type { FriendLink } from './frinedLink'

export interface Config extends UserConfig {
  translation: Translation
  friendLinks: FriendLink[]
}

export type { FriendLink, HeadLink, SocialMedia, SocialMediaKey, UserConfig }
export { AnimeRequestSchema, AnimeResponseSchema } from './anime'
export { userConfigSchema } from './config'
export { friendLinkSchema } from './frinedLink'
