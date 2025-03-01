import { readFileSync } from 'node:fs'

import yaml from 'yaml'

import {
  CONFIG_FILE_PATH,
  FRIEND_LINKS_FILE_PATH,
  getTranslationContent,
  watchConfigFile,
} from './fileUtils'

let cachedConfig: Config | null = null

// Clear cache when configuration file changes
watchConfigFile(() => {
  cachedConfig = null
})

/**
 * Retrieves the complete site configuration, including translations and friend links.
 * Uses caching to optimize performance.
 *
 * @returns Config object containing site settings, translations, and friend links
 */
function getConfig(): Config {
  if (cachedConfig) {
    return cachedConfig
  }

  const userConfig = loadUserConfig()
  const friendLinks = loadFriendLinks()
  const translations = getTranslationContent(userConfig.lang)

  cachedConfig = {
    ...userConfig,
    translation: translations,
    friendLinks,
  }

  return cachedConfig
}

/**
 * Loads the user configuration from the YAML config file.
 *
 * @returns Parsed UserConfig object
 * @throws Error if the configuration file is invalid
 */
function loadUserConfig(): UserConfig {
  const fileContent = readFileSync(CONFIG_FILE_PATH, 'utf8')
  const parsedConfig = yaml.parse(fileContent) as UserConfig

  if (!parsedConfig.title || !parsedConfig.siteUrl) {
    throw new Error('Invalid Site Config: Missing "title" or "siteUrl".')
  }

  return parsedConfig
}

/**
 * Reads and parses the friend links from the Markdown file.
 *
 * @returns Array of FriendLink objects
 */
function loadFriendLinks(): FriendLink[] {
  let fileContent = ''
  try {
    fileContent = readFileSync(FRIEND_LINKS_FILE_PATH, 'utf8')
  }
  catch {
    console.warn('Failed to read friend links file')
    return [] as FriendLink[]
  }
  return parseFriendLinks(fileContent)
}

/**
 * Parses friend links from Markdown content.
 * Searches for code blocks labeled as `Links` and extracts JSON content.
 *
 * @param fileContent - Raw Markdown content
 * @returns Array of FriendLink objects
 */
function parseFriendLinks(fileContent: string): FriendLink[] {
  const friendLinks: FriendLink[] = []
  // Match all `Links` code blocks
  const linkBlocks = fileContent.match(/```Links[\s\S]*?```/g)

  if (linkBlocks) {
    for (const block of linkBlocks) {
      // Clean up the block by removing backticks and extra spaces
      const jsonContent = block.replaceAll(/```Links|```/g, '').trim()

      try {
        // Parse the JSON content
        const parsedLinks = JSON.parse(jsonContent) as FriendLink | FriendLink[]

        // Add the parsed links to the result array
        if (Array.isArray(parsedLinks)) {
          friendLinks.push(...parsedLinks)
        }
        else {
          friendLinks.push(parsedLinks)
        }
      }
      catch (error) {
        console.error('Invalid JSON in Links block:', {
          error,
          block: jsonContent,
        })
      }
    }
  }
  else {
    console.warn('No `Links` blocks found in the file.')
  }

  return friendLinks
}

export { getConfig }
