import { CustomImage } from '@/components/ui'
import { replace } from 'es-toolkit/compat'

const renderFriendLinks = (linksChildren: string, transition: Translation) => {
  let links: FriendLink[] = []
  try {
    links = JSON.parse(replace(linksChildren, /\}\s*,\s*\{/g, '},{')) as FriendLink[]
    if (!Array.isArray(links)) {
      throw new TypeError('Parsed links is not an array')
    }
  }
  catch (error) {
    console.error('[SuzuBlog-friends] Failed to parse Friend Links JSON:', error)
    return (
      <div className="text-red-500 font-bold">
        Invalid Friend Links JSON. Please check the input format of your markdown file.
      </div>
    )
  }

  // Render the parsed friend links
  return (
    <div className="friends-links">
      <ul className="friends-links-list mx-4 flex list-outside flex-wrap items-center justify-center gap-4 p-0">
        {links.map((link, index) => (
          <li
            key={link.link ?? index}
            className="friend-link-item group relative box-border min-w-[150px] max-w-[200px] shrink grow basis-[calc(25%-16px)]"
          >
            <a
              href={link.link ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="friend-link flex h-[225px] flex-col items-center justify-center rounded-lg p-4 text-center no-underline shadow-md transition-transform-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <CustomImage
                src={link.img}
                width={100}
                height={100}
                alt={`${transition.friends.avatar}: ${link.title ?? ''}`}
                className="h-[100px] w-[100px] rounded-full object-cover object-center"
                priority={false}
              />
              <div>
                <p className="relative mx-5 mt-2 text-lg">{link.title ?? ''}</p>
              </div>
            </a>
            {/* Description shown on hover */}
            {link.des !== undefined && link.des.trim() !== '' && (
              <div className="transition-opacity-300 absolute bottom-[-30px] left-1/2 z-10 hidden translate-x-[-50%] whitespace-nowrap rounded-md bg-black px-3 py-1 text-sm text-white opacity-0 group-hover:block group-hover:opacity-100">
                {link.des ?? ''}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default renderFriendLinks
