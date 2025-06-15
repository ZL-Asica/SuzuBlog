import type { Metadata } from 'next'
import PostsPageClient from '@/components/posts/PostPageClient'
import SearchInput from '@/components/posts/SearchInput'
import { buildWebsiteJsonLd } from '@/lib/buildJsonLd'
import { buildMetadata } from '@/lib/buildMetadata'
import { getConfig } from '@/services/config'
import { getAllPosts } from '@/services/content'

export function generateMetadata(): Metadata {
  const config = getConfig()
  const translation = config.translation

  return buildMetadata({
    title: `${translation.posts.title} - ${config.title}`,
    description: `${config.title}${translation.posts.description} - ${config.description}`,
    urlPath: '/posts',
    ogType: 'website',
    image: config.avatar,
  })
}

export default async function PostsPage() {
  const config = getConfig()
  const translation = config.translation
  const posts: PostListData[] = await getAllPosts()

  const jsonLd = buildWebsiteJsonLd({
    title: `${translation.posts.title} - ${config.title}`,
    description: config.title + translation.posts.description,
    urlPath: '/posts',
    image: config.avatar,
  })

  const categories = Array.from(new Set(posts.flatMap(post => post.frontmatter.categories || [])))
  const tags = Array.from(new Set(posts.flatMap(post => post.frontmatter.tags || [])))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mt-5 mx-auto flex flex-col items-center p-4">
        <SearchInput categories={categories} tags={tags} translation={translation} />

        <PostsPageClient
          posts={posts}
          translation={translation}
          postsPerPage={Math.min(15, config.postsPerPage ?? 5)}
        />
      </div>
    </>
  )
}
