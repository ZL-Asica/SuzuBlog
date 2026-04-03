'use client'

import type { Config } from '@/schemas'
import type { AnimeResponse } from '@/schemas/anime'
import { useEffect, useState } from 'react'
import TOC from '@/components/article/TOC'
import AnimeList from './AnimeList'

interface AnimeListCollectionProps {
  animeData: AnimeResponse
  userName: string
  config: Config
}

const SORT_ORDER = ['CURRENT', 'REPEATING', 'COMPLETED', 'DROPPED', 'PAUSED', 'PLANNING']
const STORAGE_KEY = 'anime-title-display-preference'
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

type AnimeTitleDisplayStyle = 'native' | 'english' | 'romaji'

const detectDefaultTitleStyle = (): AnimeTitleDisplayStyle => {
  if (typeof window === 'undefined') {
    return 'romaji'
  }

  const preferredLanguage = navigator.languages?.[0] ?? navigator.language
  const normalizedLanguage = preferredLanguage.toLowerCase()

  if (normalizedLanguage.startsWith('ja')) {
    return 'native'
  }

  if (normalizedLanguage.startsWith('en')) {
    return 'english'
  }

  return 'romaji'
}

const loadTitleStylePreference = (): AnimeTitleDisplayStyle => {
  if (typeof window === 'undefined') {
    return 'romaji'
  }

  try {
    const rawPreference = window.localStorage.getItem(STORAGE_KEY)

    if (rawPreference === null) {
      const detectedStyle = detectDefaultTitleStyle()
      const expiresAt = Date.now() + THIRTY_DAYS_MS
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: detectedStyle, expiresAt }))
      return detectedStyle
    }

    const parsedPreference = JSON.parse(rawPreference) as { value?: AnimeTitleDisplayStyle, expiresAt?: number }

    if (parsedPreference.expiresAt === undefined || parsedPreference.expiresAt <= Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY)
      return loadTitleStylePreference()
    }

    const selectedStyle = parsedPreference.value
    const safeStyle = selectedStyle === 'native' || selectedStyle === 'english' || selectedStyle === 'romaji'
      ? selectedStyle
      : detectDefaultTitleStyle()

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value: safeStyle, expiresAt: Date.now() + THIRTY_DAYS_MS }),
    )

    return safeStyle
  }
  catch {
    return detectDefaultTitleStyle()
  }
}

const AnimeListCollection = ({ animeData, userName, config }: AnimeListCollectionProps) => {
  const {
    translation,
    author: { name: author },
  } = config
  const [selectedTitleStyle, setSelectedTitleStyle] = useState<AnimeTitleDisplayStyle>('romaji')

  useEffect(() => {
    const defaultStyle = loadTitleStylePreference()
    setSelectedTitleStyle(defaultStyle)
  }, [])

  const onTitleStyleChange = (style: AnimeTitleDisplayStyle) => {
    setSelectedTitleStyle(style)
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value: style, expiresAt: Date.now() + THIRTY_DAYS_MS }),
    )
  }

  const sortedLists = animeData.data.MediaListCollection.lists.sort(
    (a, b) => SORT_ORDER.indexOf(a.status) - SORT_ORDER.indexOf(b.status),
  )

  const tocList: TocItems[] = sortedLists.map((list, index) => ({
    slug: list.status.toLowerCase(),
    title: `${index + 1}. ${translation.anime.status[list.status.toLowerCase()]}`,
    level: 2,
  }))

  return (
    <>
      <div className="container mx-auto animate-fadeInDown p-6 pb-2 mt-5">
        <h1 className="text-4xl font-bold">
          {translation.anime.title}
        </h1>
        <p className="text-gray-400 mt-2">
          {`${author}${translation.anime.description}`}
        </p>
        <a
          href={`https://anilist.co/user/${userName}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-gray-400 mt-2 underline-interactive hover:text-primary-300"
        >
          {translation.anime.source}
          AniList
        </a>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-300">
          <span className="font-medium text-gray-200">{translation.anime.nameDisplay.label}</span>
          <div className="inline-flex rounded-lg border border-gray-700 bg-gray-800/50 p-1">
            {([
              { key: 'native', label: translation.anime.nameDisplay.japanese },
              { key: 'english', label: translation.anime.nameDisplay.english },
              { key: 'romaji', label: translation.anime.nameDisplay.romaji },
            ] as const).map(item => (
              <button
                key={item.key}
                type="button"
                onClick={() => onTitleStyleChange(item.key)}
                className={`rounded-md px-3 py-1 transition-colors ${selectedTitleStyle === item.key ? 'bg-primary text-background' : 'text-gray-300 hover:text-primary-300'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="w-full text-xs text-gray-400">{translation.anime.nameDisplay.helper}</p>
        </div>

        <AnimeList
          sortedLists={sortedLists}
          tocList={tocList}
          selectedTitleStyle={selectedTitleStyle}
        />
      </div>
      <TOC
        items={tocList}
        translation={translation}
        autoSlug={false}
        showThumbnail={false}
      />
    </>
  )
}

export default AnimeListCollection
