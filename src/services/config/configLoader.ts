import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import yaml from 'yaml'

const CONFIG_FILE_PATH = path.join(process.cwd(), 'config.yml')

export const loadUserConfig = (): UserConfig => {
  const content = readFileSync(CONFIG_FILE_PATH, 'utf8')
  const parsed = yaml.parse(content) as UserConfig

  if (!parsed.title || !parsed.siteUrl) {
    throw new Error('Invalid Site Config: Missing "title" or "siteUrl".')
  }

  return parsed
}
