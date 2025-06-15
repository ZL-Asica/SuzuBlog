import type { AniListList, AniListListEntry } from '@/schemas/anime'
import type { AnilistAnimeNameStyle } from '@/schemas/config'
import AnimeCard from './AnimeCard'

interface AnimeListProps {
  sortedLists: AniListList[]
  tocList: TocItems[]
  anilistAnimeNameStyle: AnilistAnimeNameStyle
  lang: string
}

const AnimeList = ({
  sortedLists,
  tocList,
  anilistAnimeNameStyle,
  lang,
}: AnimeListProps) => {
  return (
    <>
      {sortedLists.map((list: AniListList, listIndex) => {
        const listTitle = tocList.find(toc => toc.slug === list.status.toLowerCase())?.title
        return (
          <div key={list.name} className="mt-10">
            <h2 id={list.status.toLowerCase()} className="text-2xl font-semibold border-b border-gray-700 pb-2">
              <a href={`#${list.status.toLowerCase()}`}>
                {listTitle}
              </a>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 mt-4">
              {/* Show each anime entry */}
              {list.entries
                .sort((a, b) =>
                  (b.score ?? 0) - (a.score ?? 0)
                  || (b.notes !== null ? 1 : 0) - (a.notes !== null ? 1 : 0)
                  || (b.progress ?? 0) - (a.progress ?? 0),
                )
                .map((entry: AniListListEntry, entryIndex) => {
                  // Prefer user's config first, then their annilist prefer
                  // finally fallback to language based
                  const titleType = anilistAnimeNameStyle !== null
                    ? anilistAnimeNameStyle
                    : entry.media.title.userPreferred !== null && Object.keys(entry.media.title).includes(entry.media.title.userPreferred)
                      ? entry.media.title.userPreferred
                      : lang === 'ja'
                        ? 'native'
                        : 'romaji'
                  const animeTitle = entry.media.title[titleType as keyof typeof entry.media.title] ?? entry.media.title.romaji
                  return (
                    <AnimeCard
                      key={entry.id}
                      entry={entry}
                      animeTitle={animeTitle}
                      listIndex={listIndex}
                      entryIndex={entryIndex}
                    />
                  )
                })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AnimeList
