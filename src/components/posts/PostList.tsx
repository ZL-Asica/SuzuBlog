import { CategoriesTagsList } from '@/components/article'
import { Clock, Ellipsis } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PostListProps {
  posts: PostListData[]
  translation: Translation
}

const PostList = ({ posts, translation }: PostListProps) => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-10">
      {posts.map((post, index) => {
        const postTitle = post.frontmatter.title
        const postLink = post.slug

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
                target="_self"
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
                {/* Date of Publish */}
                <div className="mb-1 flex items-center">
                  <Clock size={18} className="mr-1" />
                  <span className="text-sm font-medium">{post.frontmatter.date.split(' ')[0]}</span>
                </div>
                {/* Title in Frontmatter */}
                <a
                  href={postLink}
                  target="_self"
                  aria-label={`${translation.post.readMore} ${postTitle}`}
                  className="text-hover-primary transition-colors-500"
                >
                  <h2 className="mb-2 text-2xl font-bold">{postTitle}</h2>
                </a>
                {/* Abstract */}
                <p className="line-clamp-5 text-sm">{post.postAbstract}</p>
              </div>

              <div className="text-gray-450 mt-3 flex items-center justify-between text-sm">
                <a
                  href={postLink}
                  target="_self"
                  aria-label={`${postTitle}`}
                  className="self-start text-hover-primary transition-all-500 hover:scale-110"
                >
                  <Ellipsis size={32} strokeWidth={3} className="cursor-pointer" />
                </a>

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
