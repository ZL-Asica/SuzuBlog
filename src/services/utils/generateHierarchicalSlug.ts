const generateHierarchicalSlug = (
  level: keyof typeof headingLevels,
  headingLevels: Record<string, number>,
) => {
  headingLevels[level] += 1

  // resetLowerLevels logic
  const levels = Object.keys(headingLevels)
  const startIndex = levels.indexOf(level) + 1
  for (const key of levels.slice(startIndex)) {
    headingLevels[key] = 0
  }

  return Object.values(headingLevels)
    .slice(0, startIndex)
    .join('-')
}

const slugPrefix = (slug: string, level: number) => {
  const parts = slug.split('-')
  if (level === 6) {
    return `${parts
      .slice(-2)
      .map(part => String.fromCharCode(96 + Number.parseInt(part, 10)))
      .join('.')} `
  }
  return `${parts.slice(0, level - 1).join('.')} `
}

export { generateHierarchicalSlug as default, slugPrefix }
