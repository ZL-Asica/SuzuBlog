import type { SocialMediaKey } from '@/schemas'
import {
  FaBilibili,
  FaBluesky,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaOrcid,
  FaRss,
  FaTelegram,
  FaYoutube,
  FaZhihu,
} from 'react-icons/fa6'

interface SocialMediaDataItem {
  urlTemplate: string
  icon: React.ComponentType<{ size: number, className?: string }>
}

type SocialData = Record<SocialMediaKey, SocialMediaDataItem>

export const socialDataTemplate: SocialData = {
  github_username: {
    urlTemplate: 'https://github.com/{username}',
    icon: FaGithub,
  },
  linkedin_username: {
    urlTemplate: 'https://www.linkedin.com/in/{username}',
    icon: FaLinkedin,
  },
  instagram_id: {
    urlTemplate: 'https://www.instagram.com/{username}',
    icon: FaInstagram,
  },
  orcid_id: {
    urlTemplate: 'https://orcid.org/{username}',
    icon: FaOrcid,
  },
  telegram_username: {
    urlTemplate: 'https://t.me/{username}',
    icon: FaTelegram,
  },
  bluesky_username: {
    urlTemplate: 'https://bsky.app/profile/{username}',
    icon: FaBluesky,
  },
  youtube_id: {
    urlTemplate: 'https://www.youtube.com/@{username}',
    icon: FaYoutube,
  },
  zhihu_username: {
    urlTemplate: 'https://www.zhihu.com/people/{username}',
    icon: FaZhihu,
  },
  bilibili_id: {
    urlTemplate: 'https://space.bilibili.com/{username}',
    icon: FaBilibili,
  },
  email: {
    urlTemplate: 'mailto:{username}',
    icon: FaEnvelope,
  },
  rss: {
    urlTemplate: '{username}',
    icon: FaRss,
  },
}
