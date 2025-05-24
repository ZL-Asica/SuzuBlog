import { loadUserConfig } from './configLoader'
import { loadFriendLinks } from './friendLinks'
import { getTranslationContent } from './translation'

class ConfigService {
  private static instance: Config | null = null

  static get(): Config {
    if (!ConfigService.instance) {
      const user = loadUserConfig()
      const translation = getTranslationContent(user.lang)
      const friendLinks = loadFriendLinks()

      ConfigService.instance = {
        ...user,
        translation,
        friendLinks,
      }
    }

    return ConfigService.instance
  }
}

export default ConfigService
