'use server';

import fs from 'node:fs';
import path from 'node:path';

import RSS from 'rss';

async function generateRssFeed(posts: PostListData[], config: Config) {
  const siteUrl = config.siteUrl;

  const feedOptions = {
    title: config.title + ' - ' + config.subTitle,
    description: config.description || 'Welcome to my blog!',
    feed_url: `${siteUrl}/feed.xml`,
    site_url: siteUrl,
    language: config.lang || 'en',
    copyright: `All rights reserved ${new Date().getFullYear()} by ${config.author.name}`,
    author: config.author.name,
    pubDate: new Date(),
    generator: 'Next.js + RSS for Node provided by ZL Asica'
  };

  // Initialize feed using RSS
  const feed = new RSS(feedOptions);

  for (const post of posts) {
    feed.item({
      title: post.frontmatter.title,
      description: post.postAbstract,
      url: `${siteUrl}/${post.slug}`,
      date: post.frontmatter.date,
      author: post.frontmatter.author,
      categories: post.frontmatter.categories
    });
  }

  // Output to public/feed.xml
  const outputPath = path.join(process.cwd(), 'public', 'feed.xml');
  fs.writeFileSync(outputPath, feed.xml({ indent: true }), 'utf8');

  console.info('RSS feed generated at /feed.xml 🎉 ');
}

export default generateRssFeed;
