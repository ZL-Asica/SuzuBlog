import { replace } from 'es-toolkit/compat';
import Link from 'next/link';

import { CustomImage } from '@/components/ui';

const renderFriendLinks = (linksChildren: string, transition: Translation) => {
  let links: FriendLink[] = [];
  try {
    links = JSON.parse(replace(linksChildren, /}\s*,\s*{/g, '},{'));
    if (!Array.isArray(links)) {
      throw new TypeError('Parsed links is not an array');
    }
  } catch (error) {
    console.error('Failed to parse Friend Links JSON:', error);
    return (
      <div className='error-message'>
        Invalid Friend Links JSON. Please check the input format.
      </div>
    );
  }

  // Render the parsed friend links
  return (
    <div className='friends-links'>
      <ul className='friends-links-list mx-4 flex list-outside flex-wrap items-center justify-center gap-4 p-0'>
        {links.map((link, index) => (
          <li
            key={index}
            className='friend-link-item group relative box-border min-w-[150px] max-w-[200px] flex-shrink flex-grow basis-[calc(25%-16px)]'
          >
            <Link
              href={link.link || ''}
              target='_blank'
              rel='noopener noreferrer'
              className='friend-link flex h-[225px] flex-col items-center justify-center rounded-lg p-4 text-center no-underline shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg'
            >
              <CustomImage
                src={link.img}
                width={100}
                height={100}
                alt={`${transition.friends.avatar}: ${link.title || ''}`}
                className='h-[100px] w-[100px] rounded-full object-cover object-center'
                priority={false}
              />
              <div>
                <p className='relative mx-5 mt-2 text-lg'>{link.title || ''}</p>
              </div>
            </Link>
            {/* Description shown on hover */}
            <div className='absolute bottom-[-30px] left-1/2 z-10 hidden translate-x-[-50%] whitespace-nowrap rounded-md bg-black px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100'>
              {link.des || ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default renderFriendLinks;
