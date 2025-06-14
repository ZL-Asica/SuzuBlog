'use client'

import type { Config } from '@/schemas'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SocialMediaLink from '@/components/common/SocialMediaLinks'

interface FooterProps {
  config: Config
}

const getYearDisplay = (startYear: number | null, currentYear: number) => {
  if (startYear !== null && startYear < currentYear) {
    return `${startYear} - `
  }
  return ''
}

const Footer = ({ config }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <footer className="mb-1 mt-10 w-full">
      <div className="mx-auto max-w-7xl px-4 py-4 text-center">
        {!isHomePage && <SocialMediaLink socialMedia={config.socialMedia} />}
        <p className="text-gray-dark">
          {`© ${getYearDisplay(config.startYear, currentYear)}${currentYear} ${config.title}`}
        </p>
        <p className="text-base text-gray-dark">
          Theme
          {' '}
          <Link
            href="https://suzu.zla.app"
            target="_blank"
            aria-label="Suzu's Documentation (new tab)"
            rel="noopener noreferrer"
            className="text-hover-primary underline-interactive"
          >
            Suzu
          </Link>
          {' '}
          by
          {' '}
          <Link
            href="https://zla.pub"
            target="_blank"
            aria-label="ZL Asica's blog (new tab)"
            rel="noopener noreferrer"
            className="text-hover-primary underline-interactive"
          >
            ZL Asica
          </Link>
        </p>
        {config.slotFooter !== null && config.slotFooter.length > 0 && (
          <div dangerouslySetInnerHTML={{ __html: config.slotFooter }} />
        )}
      </div>
    </footer>
  )
}

export default Footer
