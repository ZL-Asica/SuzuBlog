import Link from 'next/link';

import { getConfig } from '@/services/config';

import SocialMediaLink from '@/components/helpers/renderSocialMediaLink';

function Footer() {
  const config = getConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mb-1 mt-10 w-full'>
      <div className='mx-auto max-w-7xl px-4 py-4 text-center'>
        <SocialMediaLink socialMedia={config.socialMedia} />
        <p className='text-gray-800 dark:text-gray-300'>
          © 2017-{currentYear} {config.title}
          <br />
          Theme{' '}
          <Link
            href='https://suzu.zla.app/'
            target='_blank'
            aria-label="Suzu's homepage (new tab)"
            className='decoration-dashed underline-offset-2'
          >
            Suzu
          </Link>{' '}
          by{' '}
          <Link
            href='https://www.zla.app/'
            target='_blank'
            aria-label="ZL Asica's homepage (new tab)"
            className='decoration-dashed underline-offset-2'
          >
            ZL Asica
          </Link>
        </p>
      </div>
      {config.slotFooter && (
        <div dangerouslySetInnerHTML={{ __html: config.slotFooter }} />
      )}
    </footer>
  );
}

export default Footer;
