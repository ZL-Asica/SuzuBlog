import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Head from 'next/head';

import { getConfig } from '@/services/config';
import { getAllPosts, getPostData } from '@/services/content';
import generateRssFeed from '@/services/utils/generateRssFeed';

import { ArticlePage } from '@/components/article';

// build static params for all posts
async function generateStaticParams() {
  const posts = await getAllPosts();
  await generateRssFeed(posts, getConfig());
  return posts.map((post) => ({
    slug: post.slug
  }));
}

type Properties = {
  params: Promise<{ slug: string }>;
};

async function generateMetadata({ params }: Properties): Promise<Metadata> {
  // get post data
  const { slug } = await params;
  const postData: FullPostData | null = await getPostData(slug);

  const config = getConfig();
  const metaKeywords = [
    ...(postData?.frontmatter.tags || []),
    ...(postData?.frontmatter.categories || []),
    postData?.frontmatter.author || config.author.name,
    'blog'
  ].join(', ');

  return {
    title: `${postData?.frontmatter.title} - ${config.title}`,
    description: postData?.postAbstract || config.description,
    keywords: metaKeywords,
    openGraph: {
      siteName: config.title,
      type: 'article',
      authors: postData?.frontmatter.author || config.author.name,
      tags: metaKeywords,
      modifiedTime: postData?.frontmatter.date,
      title: postData?.frontmatter.title || config.title,
      description: postData?.postAbstract || config.description,
      images: postData?.frontmatter.thumbnail,
      url: `/${slug}`,
      locale: config.lang
    },
    twitter: {
      card: 'summary',
      title: postData?.frontmatter.title || config.title,
      description: postData?.postAbstract || config.description,
      images: postData?.frontmatter.thumbnail
    }
  };
}

// PostPage component that receives the params directly
async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const parameters = await props.params;
  const post: FullPostData | null = await getPostData(parameters.slug);
  if (!post) {
    return notFound();
  }

  const redirectUrl = post.frontmatter.redirect || '';
  if (redirectUrl) {
    redirect(redirectUrl);
  }

  const config: Config = getConfig();

  // JSON-LD for the article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post?.frontmatter.title,
    description: post?.postAbstract || config.description,
    author: {
      '@type': 'Person',
      name: post?.frontmatter.author || config.author.name
    },
    datePublished: post?.frontmatter.date,
    dateModified: post?.lastModified || post?.frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/${post.slug}`
    },
    image: post?.frontmatter.thumbnail,
    publisher: {
      '@type': 'Organization',
      name: config.title,
      logo: {
        '@type': 'ImageObject',
        url: config.avatar
      }
    }
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <ArticlePage
        config={config}
        post={post}
      />
    </>
  );
}

export { generateStaticParams, generateMetadata, PostPage as default };
