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
    // const SORT_ORDER = ['CURRENT', 'REPEATING', 'COMPLETED', 'DROPPED', 'PAUSED', 'PLANNING']
    status: {
      current: string
      repeating: string
      completed: string
      dropped: string
      paused: string
      planning: string
    }
  }
  post: {
    thumbnail: string
    readMore: string
    categories: string
    noCategories: string
    tags: string
    noTags: string
    toc: string
    tocToggle: string
    copy: {
      copy: string
      copied: string
      copyAriaLabel: string
      copyFailed: string
    }
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
    pagination: {
      label: string
      prev: string
      next: string
      current: string
      goTo: string
    }
  }
  newTab: string
  navigate: string
}
