'use server'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import RSS from 'rss'

async function generateRssFeed(posts: PostListData[], config: Config): Promise<void> {
  const siteUrl = config.siteUrl

  // 明确 feedOptions 类型
  const feedOptions: RSS.FeedOptions = {
    title: `${config.title} - ${config.subTitle}`,
    description: config.description || 'Welcome to my blog!',
    feed_url: `${siteUrl}/feed.xml`,
    site_url: siteUrl,
    language: config.lang || 'en',
    copyright: `All rights reserved ${new Date().getFullYear()} by ${config.author.name}`,
    pubDate: new Date(),
    generator: 'Next.js + RSS for Node provided by ZL Asica',
  }

  let feed: RSS
  try {
    feed = new RSS(feedOptions)

    for (const post of posts) {
      feed.item({
        title: post.frontmatter.title,
        description: post.postAbstract,
        url: `${siteUrl}/${post.slug}`,
        date: post.frontmatter.date,
        author: post.frontmatter.author,
        categories: post.frontmatter.categories,
      })
    }
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Error creating RSS feed:', error.message)
    }
    else {
      console.error('Unexpected error:', error)
    }
    return
  }

  try {
    const outputPath = path.join(process.cwd(), 'public', 'feed.xml')
    fs.writeFileSync(outputPath, feed.xml({ indent: true }), 'utf8')
    // eslint-disable-next-line no-console
    console.info('RSS feed generated at /feed.xml 🎉\n')
  }
  catch (writeError) {
    if (writeError instanceof Error) {
      console.error('Error writing RSS feed file:', writeError.message)
    }
    else {
      console.error('Unexpected error while writing file:', writeError)
    }
  }
}

export default generateRssFeed
