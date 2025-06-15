export const generateImageUrl = (
  siteUrl: string,
  image?: string,
): string | undefined => {
  if (image === undefined || image === null || image.trim() === '') {
    return undefined
  }
  if (image.startsWith('http')) {
    return image
  }
  const normalizedPath = image.startsWith('/') ? image : `/images/${image}`
  return `${siteUrl}${normalizedPath}`
}

export const generateImgUrlArray = (
  siteUrl: string,
  image?: string,
): string[] | undefined => {
  const img = generateImageUrl(siteUrl, image)
  if (img === undefined) {
    return undefined
  }
  return [img]
}
