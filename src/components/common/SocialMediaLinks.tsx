import type { SocialMedia } from '@/schemas/config'
import { capitalize, isEmpty } from '@zl-asica/react/utils'
import Link from 'next/link'
import { socialDataTemplate } from '@/lib'

interface socialMediaLinksProps {
  socialMedia: SocialMedia
  iconSize?: number
  className?: string
}

const SocialMediaLinks = ({
  socialMedia,
  iconSize = 32,
  className = '',
}: socialMediaLinksProps) => {
  return (
    <div
      className={`mx-4 mb-5 flex flex-wrap justify-center gap-y-4 space-x-4 ${className}`}
    >
      {Object.entries(socialMedia)
        .filter(([key, username]) => key in socialDataTemplate && !isEmpty(username))
        .map(([key, username]) => {
          const { urlTemplate, icon: IconComponent } = socialDataTemplate[key as keyof typeof socialDataTemplate]

          const label = capitalize(key.replace(/_/g, ' '))

          return (
            <Link
              key={label}
              href={urlTemplate.replace(
                '{username}',
                key === 'rss'
                  ? '/feed.xml'
                  : encodeURIComponent(String(username)),
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              prefetch={false}
              className="group relative inline-block"
            >
              <IconComponent
                size={iconSize}
                className="text-hover-primary transition-all-500 group-hover:scale-150"
                aria-hidden="true"
              />
            </Link>
          )
        })}
    </div>
  )
}

export default SocialMediaLinks
