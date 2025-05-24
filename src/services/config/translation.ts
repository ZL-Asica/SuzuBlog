import { translations } from './locales'

export const getTranslationContent = (lang?: string): Translation => {
  const normalized = lang?.toLowerCase().trim().slice(0, 2) ?? 'en'
  return translations[normalized as keyof typeof translations] ?? translations.en
}
