function getFilteredPosts(
  posts: PostListData[],
  searchQuery?: string,
  category?: string,
  tag?: string,
): PostListData[] {
  // Preprocess search query
  const queryKeywords
    = searchQuery
      ?.toLowerCase()
      .split(/\s+/) // Split by whitespace
      .filter(Boolean) || []

  const normalizedCategory = category?.toLowerCase()
  const normalizedTag = tag?.toLowerCase()

  return posts.filter((post) => {
    const { title, categories = [], tags = [] } = post.frontmatter

    // Preprocess post fields
    const normalizedTitle = title.toLowerCase()
    const normalizedAbstract = (post.postAbstract || '').toLowerCase()
    const normalizedTags = tags.map(tag => tag.toLowerCase())
    const normalizedCategories = categories.map(category => category.toLowerCase())

    // Perform search query
    const matchesQuery
      = queryKeywords.length === 0
        || queryKeywords.some(keyword =>
          [
            normalizedTitle,
            normalizedAbstract,
            ...normalizedTags,
            ...normalizedCategories,
          ].some(field => field.includes(keyword)),
        )

    // Perform category and tag filtering
    const matchesCategory = normalizedCategory !== undefined && normalizedCategory !== null
      ? normalizedCategories.some(cat => cat.includes(normalizedCategory))
      : true

    const matchesTag = normalizedTag !== undefined && normalizedTag !== null && normalizedTag !== ''
      ? normalizedTags.some(tag => tag.includes(normalizedTag))
      : true

    return matchesQuery && matchesCategory && matchesTag
  })
}

export default getFilteredPosts
