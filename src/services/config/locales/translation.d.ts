interface Translation {
  home: {
    title: string
  }
  posts: {
    title: string
    description: string
  }
  search: {
    title: string
    prompt: string
    allCategories: string
    categoriesAria: string
    allTags: string
    tagsAria: string
    clear: string
    loading: string
    submit: string
    noResultsFound: string
  }
  friends: {
    title: string
    description: string
    avatar: string
  }
  about: {
    title: string
    description: string
  }
  anime: {
    title: string
    description: string
    source: string
    status: {
      watching: string
      completed: string
      paused: string
      dropped: string
      planning: string
    }
  }
  post: {
    thumbnail: string
    readMore: string
    copy: string
    copied: string
    categories: string
    noCategories: string
    tags: string
    noTags: string
    toc: string
    tocToggle: string
    copyright: {
      author: string
      title: string
      link: string
      copyright: {
        start: string
        end: string
      }
    }
  }
  aria: {
    travellings: string
    theme: string
  }
  newTab: string
  navigate: string
}
