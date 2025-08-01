import type { CollectionPage, CreativeWork, Person, WebSite, WithContext } from 'schema-dts'
import type { FriendLink } from '@/schemas'
import { uniqueArray } from '@zl-asica/react/utils'
import { getConfig } from '@/services/config'
import { generateImageUrl } from '@/services/utils'
import { generateSocialMediaLink } from './socialDataTemplate'

const config = getConfig()

interface JsonLdBase {
  title: string
  description?: string
  keywords?: string[]
  urlPath?: string
  image?: string
  friendLinks?: FriendLink[]
}

export const personJsonLd: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': config.author.name,
  'description': config.description,
  'image': generateImageUrl(config.siteUrl, config.avatar),
  'sameAs': Object.entries(config.socialMedia)
    .map(([key, username]) => {
      const socialMediaRes = generateSocialMediaLink(key, String(username), true)
      if (socialMediaRes === null) {
        return null
      }
      return socialMediaRes.href
    })
    .filter((url): url is string => url !== null),
  'url': config.siteUrl,
}

const buildJsonLdBase = ({
  title = config.title,
  description = config.description,
  keywords = [],
  urlPath = '/',
  image,
}: JsonLdBase) => {
  const fullUrl = `${config.siteUrl}${urlPath}`

  return {
    name: title,
    url: fullUrl,
    description,
    keywords: uniqueArray([...keywords, config.author.name, 'blog', 'personal', 'SuzuBlog']),
    editor: config.author.name,
    publisher: config.author.name,
    image: generateImageUrl(config.siteUrl, image),
    author: personJsonLd,
  }
}

export const buildWebsiteJsonLd = (baseData: JsonLdBase): WithContext<WebSite> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    ...buildJsonLdBase(baseData),
    'isBasedOn': 'https://github.com/ZL-Asica/SuzuBlog',
    'license': 'https://github.com/ZL-Asica/SuzuBlog/blob/main/LICENSE',
  }
}

export const buildCollectionPageJsonLd = (baseData: JsonLdBase): WithContext<CollectionPage> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    ...buildJsonLdBase(baseData),
    'isBasedOn': 'https://github.com/ZL-Asica/SuzuBlog',
    'license': 'https://github.com/ZL-Asica/SuzuBlog/blob/main/LICENSE',
    'hasPart': (baseData.friendLinks || []).map(friend => ({
      '@type': 'WebSite',
      'name': friend.title,
      'description': friend.des,
      'url': friend.link,
      'image': friend.img,
    })),
  }
}

export const buildArticleJsonLd = (baseData: JsonLdBase): WithContext<CreativeWork> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    ...buildJsonLdBase(baseData),
  }
}
