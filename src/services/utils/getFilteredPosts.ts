// Filter posts based on search query, category, and tag with enhanced capabilities
function getFilteredPosts(
  posts: PostData[],
  searchQuery: string,
  category?: string,
  tag?: string
): PostData[] {
  const lowerCaseQuery = searchQuery.toLowerCase();
  const lowerCaseCategory = category?.toLowerCase();
  const lowerCaseTag = tag?.toLowerCase();

  // Split search query into multiple words for multi-keyword support
  const queryKeywords = lowerCaseQuery.split(' ').filter(Boolean);

  return posts.filter((post) => {
    const { title, categories, tags } = post.frontmatter;

    // Set matchesQuery to true if no keywords are provided (empty query), otherwise apply keyword filtering
    const matchesQuery =
      queryKeywords.length === 0 ||
      queryKeywords.some(
        (keyword) =>
          title.toLowerCase().includes(keyword) ||
          post.postAbstract?.toLowerCase().includes(keyword) ||
          tags?.some((tag) => tag.toLowerCase().includes(keyword))
      );

    // Enhanced category and tag matching
    const matchesCategory = lowerCaseCategory
      ? categories?.some((cat) => cat.toLowerCase().includes(lowerCaseCategory))
      : true;
    const matchesTag = lowerCaseTag
      ? tags?.some((t) => t.toLowerCase().includes(lowerCaseTag))
      : true;

    return matchesQuery && matchesCategory && matchesTag;
  });
}

export default getFilteredPosts;
