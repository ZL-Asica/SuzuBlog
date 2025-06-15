import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/article'
import { personJsonLd } from '@/lib/buildJsonLd'
import { buildMetadata } from '@/lib/buildMetadata'
import { getConfig } from '@/services/config'
import { getPostData } from '@/services/content'

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  const aboutPage: FullPostData | null = await getPostData('About')
  const aboutTranslation = config.translation.about

  return buildMetadata({
    title: `${aboutPage?.frontmatter.title ?? aboutTranslation.title} - ${config.title}`,
    description: `${config.title}${aboutTranslation.description} - ${config.description}`,
    urlPath: '/about',
    ogType: 'website',
    image: config.avatar,
  })
}

export default async function AboutPage() {
  const post: FullPostData | null = await getPostData('About')
  if (!post) {
    return notFound()
  }
  const config = getConfig()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <ArticlePage config={config} post={post} />
    </>
  )
}
