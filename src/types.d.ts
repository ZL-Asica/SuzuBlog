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
