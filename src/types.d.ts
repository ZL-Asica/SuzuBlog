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
  showLicense?: boolean;
  showThumbnail?: boolean;
  autoSlug?: boolean;
}

// Post data
interface PostListData {
  slug: string;
  postAbstract: string;
  frontmatter: Frontmatter;
  lastModified: string;
}

// Full post data
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
interface UserConfig {
  title: string;
  subTitle: string;
  description: string;
  keywords: string;
  author: {
    name: string;
    link: string;
  };
  googleAnalytics: string | null;
  postsPerPage: number | null;
  creativeCommons: CreativeCommons;
  lang: string;
  siteUrl: string;
  avatar: string;
  background: string;
  slogan: string;
  travellings: boolean | null;
  startYear: number | null;
  socialMedia: SocialMedia;
  twikooEnvId: string | null;
  disqusShortname: string | null;
  slotFooter: string;
  headerJavascript: string[];
  slotComment: string;
}

interface Config extends UserConfig {
  translation: Translation;
  friendLinks: FriendLink[];
}

interface TocItems {
  slug: string;
  title: string;
  level: number;
}

interface FriendLink {
  title?: string;
  link?: string;
  img: string;
  des?: string;
}
