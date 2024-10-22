// Frontmatter for each post md file
export interface Frontmatter {
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
export interface PostData {
  slug: string;
  frontmatter: Frontmatter;
  contentHtml: string;
}

// Category data in config.yml
export type Category = {
  name: string;
  slug?: string;
  icon?: string;
};

// Config value from config.yml
export type Config = {
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
  postCategories: Category[];
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
  scriptSlotHeader: string[];
  scriptSlotFooter: string[];
  slotFooter: string;
  slotComment: string;
};
