'use client'

import type { AniListListEntry } from '@/schemas/anime'
import { MessageCircle, Star } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Notes = dynamic(async () => import ('./Notes'))

interface AnimeCardProps {
  entry: AniListListEntry
  animeTitle: string
  listIndex: number
  entryIndex: number
}

const AnimeCard = ({
  entry,
  animeTitle,
  listIndex,
  entryIndex,
}: AnimeCardProps) => {
  const [isMobile, setIsMobile] = useState(false)
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
    <div
      key={entry.media.id}
      className="relative z-2 group bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
      onClick={() => {
        if (isMobile) {
          setShowNotes(showNotes === entry.media.id ? null : entry.media.id)
        }
      }}
      aria-label={animeTitle}
      aria-describedby={entry.notes !== null && entry.notes.trim() !== ''
        ? `notes-${entry.media.id}`
        : undefined}
    >
      {/* Show note indicator */}
      {(entry.notes !== null && entry.notes.trim() !== '') && (
        <div
          className="absolute top-2 right-2 z-1 flex items-center bg-black/70 px-2 py-1 rounded-lg shadow-md"
        >
          <MessageCircle className="text-primary-400 fill-current" size={20} aria-hidden={true} />
        </div>
      )}

      {/* Cover Image (16:9) */}
      <div className="relative w-full aspect-9/16 rounded-lg overflow-hidden">
        <Image
          src={
            entry.media.coverImage.extraLarge
            ?? entry.media.coverImage.large
            ?? entry.media.coverImage.medium
            ?? '/images/image-not-found.webp'
          }
          alt={animeTitle}
          fill
          className="object-cover"
          unoptimized
          loading={(listIndex === 1 && entryIndex <= 16) ? undefined : 'lazy'}
        />
      </div>

      {/* Title & Progress */}
      <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-2 text-white shadow-lg">
        <h3 className="text-lg font-semibold leading-tight">
          {animeTitle}
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
        <p className="text-sm font-medium">
          {entry.score ?? 'N/A'}
        </p>
        <Star className="ml-1 fill-current" size={20} aria-hidden={true} />
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
  )
}

export default AnimeCard
