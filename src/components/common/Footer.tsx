'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SocialMediaLink from '@/components/common/SocialMediaLinks';

interface FooterProperties {
  config: Config;
}

const Footer = ({ config }: FooterProperties) => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <footer className='mb-1 mt-10 w-full'>
      <div className='mx-auto max-w-7xl px-4 py-4 text-center'>
        {!isHomePage && <SocialMediaLink socialMedia={config.socialMedia} />}
        <p className='text-[var(--gray)]'>
          {`© ${config.startYear < currentYear ? `${config.startYear} - ` : ''}${currentYear} ${config.title}`}
        </p>
        <p className='text-base text-[var(--gray)]'>
          Theme{' '}
          <Link
            href='https://suzu.zla.app'
            target='_blank'
            aria-label="Suzu's Documentation (new tab)"
            rel='noopener noreferrer'
            className='decoration-dashed underline-offset-2'
          >
            Suzu
          </Link>{' '}
          by{' '}
          <Link
            href='https://www.zla.pub'
            target='_blank'
            aria-label="ZL Asica's blog (new tab)"
            rel='noopener noreferrer'
            className='decoration-dashed underline-offset-2'
          >
            ZL Asica
          </Link>
        </p>
        {config.slotFooter && (
          <div dangerouslySetInnerHTML={{ __html: config.slotFooter }} />
        )}
      </div>
    </footer>
  );
};

export default Footer;
