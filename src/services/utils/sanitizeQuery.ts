function sanitizeQuery(query: string | null): string {
  // Remove non-alphanumeric characters and trim the query
  if (query === null) return '';
  return query
    .replaceAll(/[^\p{L}\p{N}\s]/gu, '')
    .trim()
    .slice(0, 30);
}

export default sanitizeQuery;
