type SocialMediaKey =
  | 'github_username'
  | 'linkedin_username'
  | 'instagram_id'
  | 'orcid_id'
  | 'telegram_username'
  | 'bluesky_username'
  | 'youtube_id'
  | 'zhihu_username'
  | 'bilibili_id'
  | 'email'
  | 'rss'

type SocialMedia = Partial<Record<SocialMediaKey, string>>

interface SocialMediaDataItem {
  urlTemplate: string
  icon: React.ComponentType<{ size: number, className?: string }>
}

type SocialData = Record<SocialMediaKey, SocialMediaDataItem>
