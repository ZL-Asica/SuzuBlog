// Config value from config.yml
interface UserConfig {
  title: string
  subTitle: string
  description: string
  keywords: string
  author: {
    name: string
    link: string
  }
  googleAnalytics: string | null
  postsPerPage: number | null
  creativeCommons: CreativeCommons
  lang: string
  siteUrl: string
  avatar: string
  background: string
  slogan: string
  travellings: boolean | null
  startYear: number | null
  anilist_username: string | null
  socialMedia: SocialMedia
  twikooEnvId: string | null
  disqusShortname: string | null
  slotFooter: string
  headerJavascript: string[]
  slotComment: string
}

interface Config extends UserConfig {
  translation: Translation
  friendLinks: FriendLink[]
}

interface FriendLink {
  title?: string
  link?: string
  img: string
  des?: string
}
