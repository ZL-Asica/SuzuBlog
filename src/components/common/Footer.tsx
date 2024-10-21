import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaBilibili,
  FaYoutube,
  FaRss,
  FaTelegram,
} from 'react-icons/fa6';
import { SiZhihu } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { getConfig } from '@/services/config/getConfig';
import Link from 'next/link';

export default function Footer() {
  const config = getConfig();
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    instagram: FaInstagram,
    github: FaGithub,
    x: FaXTwitter,
    linkedin: FaLinkedinIn,
    youtube: FaYoutube,
    telegram: FaTelegram,
    bilibili: FaBilibili,
    zhihu: SiZhihu,
    email: MdEmail,
    rss: FaRss,
  };

  const contactList = Object.entries(config.socialMedia)
    .map(([key, href]) => {
      if (!href) {
        return null;
      }
      const IconComponent = socialIcons[key];
      const title = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize key for title
      const contactHref = key === 'email' ? `mailto:${href}` : href;
      return {
        href: contactHref,
        title,
        icon: <IconComponent size={32} />,
      };
    })
    .filter(
      (contact): contact is { href: string; title: string; icon } =>
        contact !== null,
    ); // Asserts that contact is not null

  return (
    <footer
      className='mt-10'
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className='mx-auto max-w-7xl px-4 py-4 text-center'>
        <div className='mb-5 flex flex-wrap justify-center gap-4'>
          {contactList.map(({ href, title, icon }) => (
            <Link
              key={title}
              href={href}
              title={title}
              aria-label={title}
              target='_blank'
              rel='noopener noreferrer'
              className='transform transition-transform hover:scale-110'
            >
              {icon}
            </Link>
          ))}
        </div>
        <p style={{ color: '#b9b9b9' }}>
          © 2017-{currentYear} {config.title}
          <br />
          Theme{' '}
          <Link
            href='https://suzu.zla.app/'
            target='_blank'
            aria-label="Suzu's homepage"
            style={{
              color: '#b9b9b9',
              textDecoration: 'underline dotted rgba(0, 0, 0, .1)',
            }}
          >
            Suzu
          </Link>{' '}
          by{' '}
          <Link
            href='https://www.zla.app/'
            target='_blank'
            aria-label="ZL Asica's homepage"
            style={{
              color: '#b9b9b9',
              textDecoration: 'underline dotted rgba(0, 0, 0, .1)',
            }}
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
