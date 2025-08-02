import type { SocialMedia } from '@/schemas/config'
import Link from 'next/link'
import { generateSocialMediaData } from '@/lib/socialDataTemplate'

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
        .map(([key, username]) => {
          const socialMediaData = generateSocialMediaData(key, username)
          if (socialMediaData === null) {
            return null
          }
          const { href, label, IconComponent } = socialMediaData

          return (
            <Link
              key={label}
              href={href}
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
        })
        .filter(Boolean)}
    </div>
  )
}

export default SocialMediaLinks
