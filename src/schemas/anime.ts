import { z } from 'zod'

export const AnimeRequestSchema = z.object({
  userName: z.string().min(1, 'userName is required'),
})

const AniListListEntrySchema = z.object({
  media: z.object({
    id: z.number(),
    title: z.object({
      romaji: z.string(),
      english: z.string().nullable(),
      native: z.string().nullable(),
    }),
    coverImage: z.object({
      extraLarge: z.string().nullable(),
      large: z.string().nullable(),
      medium: z.string().nullable(),
    }),
    format: z.enum(['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'MUSIC', 'TV_SHORT']),
    status: z.enum(['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED']),
    episodes: z.number().nullable(),
    averageScore: z.number().nullable(),
  }),
  score: z.number().nullable(),
  progress: z.number().nullable(),
  status: z.enum(['CURRENT', 'PLANNING', 'COMPLETED', 'DROPPED', 'PAUSED', 'REPEATING']),
  notes: z.string().nullable(),
})

const AniListListSchema = z.object({
  name: z.string(), // Watching, Planning, Completed, Dropped, Paused, Repeating
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
