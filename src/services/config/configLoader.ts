import type { UserConfig } from '@/schemas'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import yaml from 'yaml'
import { userConfigSchema } from '@/schemas'

const CONFIG_FILE_PATH = path.join(process.cwd(), 'config.yml')

class SuzuBlogConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = '[Suzu Blog Config Error] Invalid setting in config.yml'
  }
}

export const loadUserConfig = (): UserConfig => {
  const content = readFileSync(CONFIG_FILE_PATH, 'utf8')
  const parsed = userConfigSchema.safeParse(yaml.parse(content))

  if (!parsed.success) {
    const errorMessage = parsed.error.issues.map(issue => `- ${issue.path.join('.')}: ${issue.message}`).join('\n')
    throw new SuzuBlogConfigError(`\n\n${errorMessage}`)
  }

  return parsed.data
}
