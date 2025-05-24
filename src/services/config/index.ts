import type { Config } from '@/schemas'
import ConfigService from './configSingleton'

export const getConfig = (): Config => {
  return ConfigService.get()
}
