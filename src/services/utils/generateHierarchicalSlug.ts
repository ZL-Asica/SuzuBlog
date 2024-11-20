import slugify from 'slugify';

const resetLowerLevels = (
  level: keyof typeof headingLevels,
  headingLevels: Record<string, number>
) => {
  const levels = Object.keys(headingLevels) as (keyof typeof headingLevels)[];
  const startIndex = levels.indexOf(level) + 1;
  for (const key of levels.slice(startIndex)) {
    headingLevels[key] = 0;
  }
};

const generateHierarchicalSlug = (
  children: React.ReactNode | string,
  level: keyof typeof headingLevels,
  headingLevels: Record<string, number>
) => {
  headingLevels[level] += 1;
  resetLowerLevels(level, headingLevels);
  const hierarchicalSlug = Object.values(headingLevels)
    .slice(0, Object.keys(headingLevels).indexOf(level) + 1)
    .join('-');
  const baseSlug = slugify(String(children), { lower: true });
  const slug = `${hierarchicalSlug}-${baseSlug}`;

  return slug;
};

const slugPrefix = (slug: string, level: number) => {
  return `${slug
    .split('-')
    .slice(0, level - 1)
    .join('.')}.`;
};

export { generateHierarchicalSlug as default, slugPrefix };
