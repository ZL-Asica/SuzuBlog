'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CopyrightInfoProperties {
  author: string;
  siteUrl: string;
  title: string;
  creativeCommons: CreativeCommons;
  translation: Translation;
}

const CopyrightInfo = ({
  author,
  siteUrl,
  title,
  creativeCommons,
  translation
}: CopyrightInfoProperties) => {
  const pathname = usePathname();
  const copyright = translation.post.copyright;

  return (
    <div className='relative w-full rounded-3xl bg-[var(--lightGray)] p-6'>
      {/* Creative Commons Logo */}
      <div className='absolute right-4 top-4 z-0 h-28 w-28 text-base opacity-20'>
        <Image
          src='/images/copyright.png'
          alt='Creative Commons Logo'
          width={200}
          height={200}
          priority={false}
        />
      </div>

      {/* Copyright Info */}
      <div className='z-20'>
        <p className='font-semibold'>{copyright.author + author}</p>
        <p className='mt-2'>{copyright.title + title}</p>
        <p className='mt-2'>
          {copyright.link}
          <Link
            href={`${siteUrl}${pathname}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sakuraPink no-underline'
          >
            {`${siteUrl}${pathname}`}
          </Link>
        </p>
        <p className='mt-2'>
          {copyright.copyright.start}
          {` `}
          <Link
            href={creativeCommons.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sakuraPink no-underline'
          >
            {creativeCommons.type}
          </Link>
          {` `}
          {copyright.copyright.end}
        </p>
      </div>
    </div>
  );
};

export default CopyrightInfo;
