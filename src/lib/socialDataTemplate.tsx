import type { SocialMediaKey } from '@/schemas'
import { capitalize, isEmpty } from '@zl-asica/react/utils'
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

const socialDataTemplate: SocialData = {
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

export const generateSocialMediaLink = (
  key: string,
  username: string | null,
  onlyExternal: boolean = false,
): {
  href: string
  IconComponent: React.ComponentType<{ size: number, className?: string }>
} | null => {
  if (typeof username !== 'string') {
    return null
  }

  if (isEmpty(username) || !(key in socialDataTemplate)) {
    return null
  }

  if (onlyExternal && (key === 'rss' || key === 'email')) {
    return null
  }

  let href: string

  if (key === 'rss' && Boolean(username)) {
    href = '/feed.xml'
  }
  if (key === 'email') {
    href = `mailto:${username}`
  }

  const { urlTemplate, icon: IconComponent } = socialDataTemplate[key as keyof typeof socialDataTemplate]
  if (!urlTemplate) {
    return null
  }
  href = urlTemplate.replace('{username}', encodeURIComponent(username))
  return { href, IconComponent }
}

export const generateSocialMediaData = (
  key: string,
  username: string | null,
  onlyExternal: boolean = false,
): {
  href: string
  label: string
  IconComponent: React.ComponentType<{ size: number, className?: string }>
} | null => {
  const linkRes = generateSocialMediaLink(key, username, onlyExternal)
  if (linkRes === null) {
    return null
  }
  const { href, IconComponent } = linkRes
  const label = capitalize(key.replace(/_/g, ' '))
  return {
    href,
    label,
    IconComponent,
  }
}
