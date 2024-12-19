import { replace, words } from 'es-toolkit/compat'
import { upperFirst } from 'es-toolkit/string'
import Link from 'next/link'
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

const socialData = {
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

interface socialMediaLinksProperties {
  socialMedia: SocialMedia
  iconSize?: number
  className?: string
}

function SocialMediaLinks({
  socialMedia,
  iconSize = 32,
  className = '',
}: socialMediaLinksProperties) {
  return (
    <div
      className={`mx-4 mb-5 flex flex-wrap justify-center gap-y-4 space-x-4 ${className}`}
    >
      {Object.entries(socialMedia)
        .filter(([key, username]) => key in socialData && username !== null)
        .map(([key, username]) => {
          const { urlTemplate, icon: IconComponent } = socialData[key as keyof typeof socialData]

          const label = upperFirst(words(key)[0])
          if (key === 'rss' && username !== 'false') {
            username = `/feed.xml`
          }
          return (
            <Link
              key={label}
              href={replace(
                urlTemplate,
                '{username}',
                key === 'rss' ? username : encodeURIComponent(username),
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              prefetch={false}
              className="group relative inline-block transform transition-all duration-700 ease-out"
            >
              <IconComponent
                size={iconSize}
                className="transition-transform duration-500 group-hover:scale-150"
              />
            </Link>
          )
        })}
    </div>
  )
}

export default SocialMediaLinks
