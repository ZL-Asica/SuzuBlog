'use client'

import type { AniListList, AniListListEntry } from '@/schemas/anime'
import { MessageCircle, Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Notes from './Notes'

interface AnimeCardProps {
  sortedLists: AniListList[]
  lang: string
  translation: Translation
}

const AnimeCard = ({ sortedLists, lang, translation }: AnimeCardProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showNotes, setShowNotes] = useState<number | null>(null)

  useEffect(() => {
    // Detect if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches)
    }

    checkMobile()

    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <>
      {sortedLists.map((list: AniListList, index) => (
        <div key={list.name} className="mt-10">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            <a id={list.name} href={`#${list.name}`}>
              {`${index + 1}. ${translation.anime.status[list.name.toLowerCase()]}`}
            </a>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 mt-4">
            {/* Show each anime entry */}
            {list.entries
              .sort((a, b) =>
                (b.score ?? 0) - (a.score ?? 0)
                || (b.progress ?? 0) - (a.progress ?? 0)
                || (b.notes !== null ? 1 : 0) - (a.notes !== null ? 1 : 0),
              )
              .map((entry: AniListListEntry, entryIndex) => (
                <div
                  key={entry.media.id}
                  className="relative group bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    if (isMobile) {
                      setShowNotes(showNotes === entry.media.id ? null : entry.media.id)
                    }
                  }}
                >
                  {/* Show note indicator */}
                  {(entry.notes !== null && entry.notes.trim() !== '') && (
                    <div
                      className="absolute top-2 right-2 z-1 flex items-center bg-black/70 px-2 py-1 rounded-lg shadow-md"
                    >
                      <MessageCircle className="text-primary-400 fill-current" size={20} />
                    </div>
                  )}

                  {/* Cover Image (16:9) */}
                  <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
                    <Image
                      src={
                        entry.media.coverImage.extraLarge
                        ?? entry.media.coverImage.large
                        ?? entry.media.coverImage.medium
                        ?? '/images/image-not-found.webp'
                      }
                      alt={lang === 'ja' && entry.media.title.native !== null
                        ? entry.media.title.native
                        : lang === 'en' && entry.media.title.english !== null
                          ? entry.media.title.english
                          : entry.media.title.romaji}
                      fill
                      className="object-cover"
                      unoptimized
                      priority={index === 1 && entryIndex <= 16}
                    />
                  </div>

                  {/* Title & Progress */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-2 text-white shadow-lg">
                    <h3 className="text-lg font-semibold leading-tight">
                      {lang === 'ja' && entry.media.title.native !== null
                        ? entry.media.title.native
                        : lang === 'en' && entry.media.title.english !== null
                          ? entry.media.title.english
                          : entry.media.title.romaji}
                    </h3>
                    <p className="text-md font-semibold text-gray-300 mt-1">
                      {entry.progress ?? 0}
                      {' '}
                      /
                      {entry.media.episodes ?? '?'}
                    </p>
                  </div>

                  {/* Rating */}
                  <div
                    className={`absolute bottom-2 right-2 flex items-center bg-black/60 px-2 py-1 rounded-lg ${
                      entry.score !== null && entry.score !== 0 ? 'text-primary-400' : 'text-gray-400'
                    }`}
                  >
                    <p className="text-sm font-medium">{entry.score ?? 'N/A'}</p>
                    <Star className="ml-1 fill-current" size={20} />
                  </div>

                  {/* Hover Note */}
                  {(entry.notes !== null && entry.notes.trim() !== '')
                    && (
                      <Notes
                        text={entry.notes}
                        isMobile={isMobile}
                        showNotes={showNotes === entry.media.id}
                      />
                    )}

                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnimeCard
