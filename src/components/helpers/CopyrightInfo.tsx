'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CopyrightInfoProperties {
  author: string;
  siteUrl: string;
  title: string;
  creativeCommons: CreativeCommons;
}

function CopyrightInfo({
  author,
  siteUrl,
  title,
  creativeCommons,
}: CopyrightInfoProperties) {
  const pathname = usePathname();
  return (
    <div className='relative w-full rounded-3xl bg-[var(--lightGray)] p-6'>
      {/* Creative Commons Logo */}
      <div className='absolute right-4 top-4 z-0 h-28 w-28 text-base opacity-20'>
        <Image
          src='/images/copyright.png'
          alt='Creative Commons Logo'
          width={200}
          height={200}
          layout='intrinsic'
          objectFit='contain'
          priority={false}
        />
      </div>

      {/* Copyright Info */}
      <div className='z-20'>
        <p className='font-semibold'>本文作者：{author}</p>
        <p className='mt-2'>本文标题：{title}</p>
        <p className='mt-2'>
          本文链接：
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
          版权声明：本文采用
          <Link
            href={creativeCommons.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sakuraPink no-underline'
          >
            {creativeCommons.type} 协议
          </Link>
          进行许可
        </p>
      </div>
    </div>
  );
}

export default CopyrightInfo;
