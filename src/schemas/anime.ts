import { z } from 'zod'

const AniListMediaSchema = z.object({
  id: z.number(),
  averageScore: z.number().nullable(),
  episodes: z.number().nullable(),
  format: z.enum(['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC', 'MANGA', 'NOVEL', 'ONE_SHOT']).nullable(),
  status: z.enum(['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS']),
  coverImage: z.object({
    extraLarge: z.string().nullable(),
    large: z.string().nullable(),
    medium: z.string().nullable(),
  }),
  title: z.object({
    english: z.string().nullable(),
    native: z.string().nullable(),
    romaji: z.string(),
    userPreferred: z.string().nullable(),
  }),
})

const AniListListEntrySchema = z.object({
  id: z.number(),
  score: z.number().nullable(),
  progress: z.number().nullable(),
  status: z.enum(['CURRENT', 'PLANNING', 'COMPLETED', 'DROPPED', 'PAUSED', 'REPEATING']),
  notes: z.string().nullable(),
  media: AniListMediaSchema,
})

const AniListListSchema = z.object({
  name: z.string(), // Watching, Planning, Completed, Dropped, Paused, Repeating, CUSTOM
  status: z.enum(['CURRENT', 'PLANNING', 'COMPLETED', 'DROPPED', 'PAUSED', 'REPEATING']),
  isCustomList: z.boolean(),
  entries: z.array(
    AniListListEntrySchema,
  ),
})

export const AnimeResponseSchema = z.object({
  data: z.object({
    MediaListCollection: z.object({
      lists: z.array(
        AniListListSchema,
      ),
    }),
  }),
})

type AniListListEntry = z.infer<typeof AniListListEntrySchema>
type AniListList = z.infer<typeof AniListListSchema>
type AnimeResponse = z.infer<typeof AnimeResponseSchema>

export type { AniListList, AniListListEntry, AnimeResponse }
