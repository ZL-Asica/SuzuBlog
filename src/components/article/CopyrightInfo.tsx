'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface CopyrightInfoProps {
  author: string
  siteUrl: string
  title: string
  creativeCommons: CreativeCommons
  translation: Translation
}

const CopyrightInfo = ({
  author,
  siteUrl,
  title,
  creativeCommons,
  translation,
}: CopyrightInfoProps) => {
  const pathname = usePathname()
  const copyright = translation.post.copyright

  return (
    <div className="relative w-full rounded-3xl bg-gray-light p-6">
      {/* Creative Commons Logo */}
      <div className="absolute right-4 top-4 z-0 h-28 w-28 text-base opacity-20">
        <Image
          src="/images/copyright.png"
          alt="Creative Commons Logo"
          width={200}
          height={200}
          priority={false}
        />
      </div>

      {/* Copyright Info */}
      <div className="z-20 flex flex-col items-start gap-2">
        <p className="font-semibold">{copyright.author + author}</p>
        <p>{copyright.title + title}</p>
        <p>
          {copyright.link}
          <a
            href={`${siteUrl}${pathname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-hover-secondary underline-interactive no-underline"
          >
            {`${siteUrl}${pathname}`}
          </a>
        </p>
        <p className="">
          {copyright.copyright.start}
          {` `}
          <a
            href={creativeCommons.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-hover-secondary underline-interactive"
          >
            {creativeCommons.type}
          </a>
          {` `}
          {copyright.copyright.end}
        </p>
      </div>
    </div>
  )
}

export default CopyrightInfo
