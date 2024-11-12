import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaOrcid,
  FaTelegram,
  FaXTwitter,
  FaYoutube,
  FaZhihu,
  FaBilibili,
  FaRss,
} from 'react-icons/fa6';
import { upperFirst } from 'es-toolkit/string';
import { words, replace, isString } from 'es-toolkit/compat';

import { getConfig } from '@/services/config';

function Footer() {
  const config = getConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mt-10'>
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

function SocialMediaLink({ socialMedia }: { socialMedia: SocialMedia }) {
  return (
    <div className='mb-5 flex flex-wrap justify-center space-x-4'>
      {Object.entries(socialMedia)
        .filter(([key, username]) => key in socialData && isString(username))
        .map(([key, username]) => {
          const { urlTemplate, icon: IconComponent } =
            socialData[key as SocialMediaKey];

          const label = upperFirst(words(key)[0]);
          return (
            <Link
              key={label}
              href={replace(
                urlTemplate,
                '{username}',
                encodeURIComponent(username)
              )}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              className='group relative inline-block transform transition-all duration-300 ease-out'
            >
              <IconComponent
                size={32}
                className='transition-transform group-hover:scale-150'
              />
            </Link>
          );
        })}
    </div>
  );
}

type SocialMediaKey = keyof typeof socialData;

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
  x_username: {
    urlTemplate: 'https://x.com/{username}',
    icon: FaXTwitter,
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
    icon: MdEmail,
  },
  rss: {
    urlTemplate: '{username}',
    icon: FaRss,
  },
};

export default Footer;
