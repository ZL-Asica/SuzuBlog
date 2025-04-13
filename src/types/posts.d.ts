// Frontmatter for each post md file
interface Frontmatter {
  title: string
  date: string
  author: string
  thumbnail: string
  tags?: string[]
  categories?: string[]
  redirect?: string
  showComments?: boolean
  showLicense?: boolean
  showThumbnail?: boolean
  autoSlug?: boolean
}

// Post data
interface PostListData {
  slug: string
  postAbstract: string
  frontmatter: Frontmatter
  lastModified: string
  contentRaw: string
}

// Full post data
interface FullPostData extends PostListData {
  toc: TocItems[]
}

interface CreativeCommons {
  type: string
  link: string
}

interface TocItems {
  slug: string
  title: string
  level: number
}
