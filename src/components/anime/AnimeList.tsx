import type { AnimeResponse } from '@/schemas/anime'
import TOC from '@/components/article/TOC'
import AnimeCard from './AnimeCard'

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
        <a
          href={`https://anilist.co/user/${userName}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-gray-400 mt-2 underline-interactive hover:text-primary-300"
        >
          {translation.anime.source}
          AniList
        </a>

        <AnimeCard sortedLists={sortedLists} lang={lang} translation={translation} />

      </div>
      <TOC items={tocList} translation={translation} autoSlug={false} showThumbnail={false} />
    </>
  )
}

export default AnimeList
