const generateImageUrl = (
  siteUrl: string,
  image?: string,
): string[] | undefined => {
  if (image === undefined || image === null || image.trim() === '') {
    return undefined
  }
  if (image.startsWith('http')) {
    return [image]
  }
  const normalizedPath = image.startsWith('/') ? image : `/images/${image}`
  return [`${siteUrl}${normalizedPath}`]
}

export default generateImageUrl
