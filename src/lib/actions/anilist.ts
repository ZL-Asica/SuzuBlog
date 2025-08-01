'use server'

import type { AnimeResponse } from '@/schemas/anime'
import { z } from 'zod'
import { AnimeResponseSchema } from '@/schemas'

export const fetchAnilistData = async (
  userName: string,
): Promise<ActionResponse<AnimeResponse>> => {
  if (userName.length <= 1) {
    return {
      success: false,
      message: 'Username Issue',
    }
  }

  const query = `
      query ($userName: String) {
        MediaListCollection(userName: $userName, type: ANIME) {
          lists {
            name
            status
            isCustomList
            entries {
              id
              score
              progress
              status
              notes
              media {
                id
                averageScore
                episodes
                format
                status
                coverImage {
                  extraLarge
                  large
                  medium
                }
                title {
                  english
                  native
                  romaji
                  userPreferred
                }
              }
            }
          }
        }
      }`

  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables: { userName } }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('GraphQL API error:', errorBody)
      return {
        success: false,
        message: 'Upstream API error',
      }
    }

    const data = await response.json() as unknown

    const parsedResponse = AnimeResponseSchema.parse(data)
    return {
      success: true,
      message: 'Data fetched successfully',
      data: parsedResponse,
    }
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation error:', error.issues)
      return {
        success: false,
        message: error.issues.map(e => e.message).join(', '),
      }
    }
    console.error('Internal Server Error:', error)
    return {
      success: false,
      message: 'Internal Server Error',
    }
  }
}
