import type { Config } from '@/schemas'
import type { AnimeResponse } from '@/schemas/anime'
import TOC from '@/components/article/TOC'
import AnimeList from './AnimeList'

interface AnimeListCollectionProps {
  animeData: AnimeResponse
  userName: string
  config: Config
}

const SORT_ORDER = ['CURRENT', 'REPEATING', 'COMPLETED', 'DROPPED', 'PAUSED', 'PLANNING']

const AnimeListCollection = ({ animeData, userName, config }: AnimeListCollectionProps) => {
  const {
    translation,
    author: { name: author },
    lang,
    anilist_anime_name_style,
  } = config

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

        <AnimeList
          sortedLists={sortedLists}
          tocList={tocList}
          anilistAnimeNameStyle={anilist_anime_name_style}
          lang={lang}
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
