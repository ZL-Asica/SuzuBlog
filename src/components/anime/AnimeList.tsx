import type { AniListList, AniListListEntry, AnimeResponse } from '@/schemas/anime'
import TOC from '@/components/article/TOC'
import Image from 'next/image'
import Link from 'next/link'
import { FaCommentDots, FaStar } from 'react-icons/fa6'

interface AnimeListProps {
  animeData: AnimeResponse
  userName: string
  author: string
  lang: string
  translation: Translation
}

const SORT_ORDER = ['Watching', 'Completed', 'Paused', 'Dropped', 'Planning']

const AnimeList = ({ animeData, userName, author, lang, translation }: AnimeListProps) => {
  const sortedLists = animeData?.data?.MediaListCollection?.lists.sort(
    (a, b) => SORT_ORDER.indexOf(a.name) - SORT_ORDER.indexOf(b.name),
  )

  const tocList: TocItems[] = sortedLists.map((list, index) => ({
    slug: list.name,
    title: `${index + 1}. ${translation.anime.status[list.name.toLowerCase()]}`,
    level: 2,
  }))

  return (
    <>
      <div className="container mx-auto animate-fadeInDown p-6 pb-2 mt-5">
        <h1 className="text-4xl font-bold">{translation.anime.title}</h1>
        <p className="text-gray-400 mt-2">{`${author}${translation.anime.description}`}</p>
        <Link
          href={`https://anilist.co/user/${userName}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-gray-400 mt-2 underline decoration-dashed underline-offset-2 hover:text-[var(--sakuraPink)] hover:decoration-dotted"
          prefetch={false}
        >
          {translation.anime.source}
          AniList
        </Link>

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
                .map((entry: AniListListEntry) => (
                  <div
                    key={entry.media.id}
                    className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-105"
                  >
                    {/* Show note indicator */}
                    {(entry.notes !== null && entry.notes.trim() !== '') && (
                      <div
                        className="absolute top-2 right-2 z-10 flex items-center bg-black/70 px-2 py-1 rounded-lg shadow-md"
                      >
                        <FaCommentDots className="text-[var(--sakuraPinkDark)]" size={20} />
                      </div>
                    )}

                    {/* Cover Image (16:9) */}
                    <div className="relative w-full aspect-[9/16]">
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
                        priority
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
                        entry.score !== null && entry.score !== 0 ? 'text-[var(--sakuraPinkDark)]' : 'text-gray-400'
                      }`}
                    >
                      <p className="text-sm">{entry.score ?? 'N/A'}</p>
                      <FaStar className="ml-1" />
                    </div>

                    {/* Hover Note */}
                    {(entry.notes !== null && entry.notes.trim() !== '') && (
                      <div className="absolute inset-0 bg-black/80 text-white flex items-center justify-center p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-base font-medium text-left">
                          {entry.notes.trim()}
                        </p>
                      </div>
                    )}

                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <TOC items={tocList} translation={translation} autoSlug={false} showThumbnail={false} />
    </>
  )
}

export default AnimeList
