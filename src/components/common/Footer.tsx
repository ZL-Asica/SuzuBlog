'use client'

import SocialMediaLink from '@/components/common/SocialMediaLinks'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

interface FooterProps {
  config: Config
}

const getYearDisplay = (startYear: number | null | undefined, currentYear: number) => {
  if (startYear != null && !Number.isNaN(startYear) && startYear < currentYear) {
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
        <p className="text-[var(--gray)]">
          {`© ${getYearDisplay(config.startYear, currentYear)}${currentYear} ${config.title}`}
        </p>
        <p className="text-base text-[var(--gray)]">
          Theme
          {' '}
          <Link
            href="https://suzu.zla.app"
            target="_blank"
            aria-label="Suzu's Documentation (new tab)"
            rel="noopener noreferrer"
            className="underline decoration-dashed underline-offset-2 transition-all duration-200 ease-in-out hover:font-bold hover:text-[var(--sakuraPink)] hover:underline hover:decoration-dotted"
          >
            Suzu
          </Link>
          {' '}
          by
          {' '}
          <Link
            href="https://www.zla.pub"
            target="_blank"
            aria-label="ZL Asica's blog (new tab)"
            rel="noopener noreferrer"
            className="underline decoration-dashed underline-offset-2 transition-all duration-200 ease-in-out hover:font-bold hover:text-[var(--sakuraPink)] hover:underline hover:decoration-dotted"
          >
            ZL Asica
          </Link>
        </p>
        {config.slotFooter && (
          <div dangerouslySetInnerHTML={{ __html: config.slotFooter }} />
        )}
      </div>
    </footer>
  )
}

export default Footer
