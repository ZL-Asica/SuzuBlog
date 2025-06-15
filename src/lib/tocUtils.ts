/**
 * Scroll smoothly to the target element by slug, with offset
 */
export const scrollToSlug = (slug: string, offset: number) => {
  const element = document.querySelector(`#${CSS.escape(slug)}`)
  if (!element) {
    return
  }

  const rect = element.getBoundingClientRect()
  const scrollY = window.scrollY + rect.top - offset

  window.scrollTo({ top: scrollY, behavior: 'smooth' })
}

/**
 * Find the closest heading slug based on scroll and position
 * @param headings list of heading elements
 * @param offset fixed header height to exclude from view
 * @param triggerOffset minimum top distance after the offset before heading is considered "active" (e.g. 150)
 */
export const findClosestSlug = (
  headings: HTMLElement[],
  offset: number,
  triggerOffset: number = 150,
): string | null => {
  const mapped = headings
    .map((heading) => {
      const rect = heading.getBoundingClientRect()
      return {
        heading,
        topOffset: rect.top - offset,
        bottomOffset: rect.bottom - offset,
      }
    })
    .filter(({ heading }) => heading.id)

  // Step 1: Find headings that are within the "activation threshold"
  const thresholdPassed = mapped.filter(
    ({ topOffset }) => topOffset <= offset + triggerOffset,
  )

  if (thresholdPassed.length > 0) {
    return thresholdPassed[thresholdPassed.length - 1].heading.id
  }

  return null
}

/**
 * Scroll the TOC sidebar to center the active link
 */
export const centerActiveLink = (tocContainer: HTMLElement, slug: string) => {
  const activeLink = tocContainer.querySelector(`a[href="#${CSS.escape(slug)}"]`)
  if (!activeLink) {
    return
  }

  const linkTop = (activeLink as HTMLElement).offsetTop
  const containerHeight = tocContainer.clientHeight
  const offset = linkTop - containerHeight / 2
  if (Math.abs(tocContainer.scrollTop - offset) > 10) {
    tocContainer.scrollTo({ top: offset, behavior: 'smooth' })
  }
}
