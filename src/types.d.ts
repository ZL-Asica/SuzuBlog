// Frontmatter for each post md file
interface Frontmatter {
  title: string;
  date: string;
  author: string;
  thumbnail: string;
  tags?: string[];
  categories?: string[];
  redirect?: string;
  showComments?: boolean;
}

// Post data
interface PostData {
  slug: string;
  postAbstract: string;
  frontmatter: Frontmatter;
  contentHtml: string;
  lastModified: string;
}

// Config value from config.yml
type Config = {
  title: string;
  subTitle: string;
  description: string;
  keywords: string;
  author: {
    name: string;
    link: string;
  };
  lang: string;
  siteUrl: string;
  avatar: string;
  background: string;
  slogan: string;
  socialMedia: {
    github: string;
    linkedin: string;
    x: string;
    instagram: string;
    youtube: string;
    telegram: string;
    bilibili: string;
    zhihu: string;
    email: string;
    rss: string;
  };
  thumbnailAbout: boolean;
  thumbnailFriends: boolean;
  disqusShortname: string;
  slotFooter: string;
  slotComment: string;
};
