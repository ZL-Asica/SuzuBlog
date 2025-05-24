import { translations } from './locales'

export const getTranslationContent = (lang?: string): Translation => {
  const normalized = lang?.toLowerCase().trim() ?? 'en'
  return translations[normalized as keyof typeof translations] ?? translations.en
}
