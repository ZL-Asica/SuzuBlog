import { watch } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { lowerCase, trim } from 'es-toolkit/compat'

import * as translations from './locales'

// Config file path
const CONFIG_FILE_PATH = path.join(process.cwd(), 'config.yml')

// Friend links markdown file path
const FRIEND_LINKS_FILE_PATH = path.join(process.cwd(), 'posts', '_pages', 'Friends.md')

/**
 * Fetches translation content for a given language.
 * Falls back to English if the specified language is unavailable.
 *
 * @param lang - The language code (e.g., 'en', 'zh')
 * @returns Translation object
 */
function getTranslationContent(lang: string): Translation {
  const normalizedLang = lowerCase(trim(lang))
  const translation = translations[normalizedLang] as Translation | undefined

  return translation || translations.en
}

/**
 * Watches the configuration file for changes and triggers a callback.
 *
 * @param callback - Function to execute when the file changes
 */
function watchConfigFile(callback: () => void): void {
  let debounceTimeout: NodeJS.Timeout | null = null

  watch(CONFIG_FILE_PATH, () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
    debounceTimeout = setTimeout(callback, 100) // Debounce with a delay of 100ms
  })
}

export {
  CONFIG_FILE_PATH,
  FRIEND_LINKS_FILE_PATH,
  getTranslationContent,
  watchConfigFile,
}
