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
interface PostListData {
  slug: string;
  postAbstract: string;
  frontmatter: Frontmatter;
  lastModified: string;
}

// 完整的文章数据（用于文章详情页）
interface FullPostData extends PostListData {
  contentRaw: string;
  toc: TocItems[];
}

type SocialMediaKey = keyof typeof socialData;

type SocialMedia = Record<string, string>;

interface CreativeCommons {
  type: string;
  link: string;
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
  creativeCommons: CreativeCommons;
  lang: string;
  siteUrl: string;
  avatar: string;
  background: string;
  slogan: string;
  socialMedia: SocialMedia;
  thumbnailAbout: boolean;
  thumbnailFriends: boolean;
  disqusShortname: string;
  slotFooter: string;
  slotComment: string;
};

interface TocItems {
  slug: string;
  title: string;
  level: number;
}
