import { Clock, Clock as ClockIcon, Ellipsis, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import readingTime from 'reading-time'
import { CategoriesTagsList } from '@/components/article'

interface PostListProps {
  posts: PostListData[]
  translation: Translation
}

const PostList = ({ posts, translation }: PostListProps) => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-10 motion-safe:animate-mask-reveal">
      {posts.map((post, index) => {
        const postTitle = post.frontmatter.title
        const postRedirect = post.frontmatter.redirect !== undefined && post.frontmatter.redirect !== ''

        const postLink = postRedirect
          ? post.frontmatter.redirect as string
          : post.slug

        return (
          <article
            key={post.slug}
            className={`mx-auto flex h-[550px] w-11/12 max-w-4xl flex-col overflow-hidden rounded-lg shadow-lg md:h-[300px] md:w-full md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            } shadow-gray-light drop-shadow-xs`}
          >
            {/* Thumbnail */}
            <div
              className={`relative w-full rounded-lg md:rounded-none ${
                index % 2 === 0 ? 'md:rounded-r-lg' : 'md:rounded-l-lg'
              } h-1/2 overflow-hidden md:h-full md:w-7/12`}
            >
              <Link
                className="block h-full w-full transition-transform-700 hover:scale-110"
                href={postLink}
                target={postRedirect ? '_blank' : '_self'}
                aria-label={`${translation.post.readMore} ${postTitle}`}
                prefetch
              >
                <Image
                  src={post.frontmatter.thumbnail}
                  alt={`${translation.post.thumbnail} ${postTitle}`}
                  width={780}
                  height={500}
                  className="h-full w-full object-cover"
                  priority={index < 3}
                />
              </Link>
            </div>

            {/* Content */}
            <div className="m-6 flex h-1/2 flex-col justify-between md:h-auto md:w-5/12">
              <div>
                {/* Post metadata */}
                <div className="mb-1 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span className="font-medium">{post.frontmatter.date.split(' ')[0]}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center">
                    <FileText size={16} className="mr-1" />
                    <span>
                      {post.contentRaw.replace(/\s+/g, '').length}
                      字
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center">
                    <ClockIcon size={16} className="mr-1" />
                    <span>
                      {Math.max(1, Math.ceil(readingTime(post.contentRaw).minutes))}
                      分钟阅读
                    </span>
                  </div>
                </div>
                {/* Title in Frontmatter */}
                <Link
                  href={postLink}
                  target={postRedirect ? '_blank' : '_self'}
                  aria-label={`${translation.post.readMore} ${postTitle}`}
                  className="text-hover-primary transition-colors-500"
                >
                  <h2 className="mb-2 text-2xl font-bold">{postTitle}</h2>
                </Link>
                {/* Abstract */}
                <p className="line-clamp-5 text-sm">{post.postAbstract}</p>
              </div>

              <div className="text-gray-450 mt-3 flex items-center justify-between text-sm">
                <Link
                  href={postLink}
                  target={postRedirect ? '_blank' : '_self'}
                  aria-label={`${postTitle}`}
                  className="self-start text-hover-primary transition-all-500 hover:scale-110"
                >
                  <Ellipsis size={32} strokeWidth={3} className="cursor-pointer" />
                </Link>

                {/* Category */}
                <CategoriesTagsList
                  type="category"
                  translation={translation}
                  items={post.frontmatter.categories}
                />
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default PostList
