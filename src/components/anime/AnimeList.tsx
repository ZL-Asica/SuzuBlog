import type { AniListList, AniListListEntry } from '@/schemas/anime'
import AnimeCard from './AnimeCard'

interface AnimeListProps {
  sortedLists: AniListList[]
  tocList: TocItems[]
  selectedTitleStyle: 'native' | 'english' | 'romaji'
}

const chineseCharacterRegex = /\p{Script=Han}/u

const resolveChineseTitle = (entry: AniListListEntry): string | null => {
  const nativeTitle = entry.media.title.native
  if (nativeTitle !== null && chineseCharacterRegex.test(nativeTitle)) {
    return nativeTitle
  }

  const matchedSynonym = entry.media.synonyms.find(synonym => chineseCharacterRegex.test(synonym))
  return matchedSynonym ?? null
}

const isChinesePreferredLanguage = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false
  }

  const preferredLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  return preferredLanguages.some(language => language.toLowerCase().startsWith('zh'))
}

const resolveAnimeTitle = (
  entry: AniListListEntry,
  selectedTitleStyle: 'native' | 'english' | 'romaji',
): string => {
  const chineseTitle = isChinesePreferredLanguage() ? resolveChineseTitle(entry) : null
  const titles = entry.media.title

  switch (selectedTitleStyle) {
    case 'native':
      return chineseTitle ?? titles.native ?? titles.romaji
    case 'english':
      return titles.english ?? chineseTitle ?? titles.romaji
    case 'romaji':
      return titles.romaji
    default:
      return titles.romaji
  }
}

const AnimeList = ({
  sortedLists,
  tocList,
  selectedTitleStyle,
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
                  const animeTitle = resolveAnimeTitle(entry, selectedTitleStyle)
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
