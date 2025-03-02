import { AnimeRequestSchema, AnimeResponseSchema } from '@/schemas/anime'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userName = searchParams.get('userName')

    const parsedParams = AnimeRequestSchema.parse({ userName })

    const query = `
      query ($userName: String) {
        MediaListCollection(userName: $userName, type: ANIME) {
          lists {
            name
            entries {
              media {
                id
                title {
                  romaji
                  english
                  native
                }
                coverImage {
                  extraLarge
                  large
                  medium
                }
                status
                episodes
                format
                averageScore
              }
              score
              progress
              status
              notes
            }
          }
        }
      }
    `

    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables: { userName: parsedParams.userName } }),
    })

    const data = await response.json() as unknown

    const parsedResponse = AnimeResponseSchema.parse(data)

    return NextResponse.json(parsedResponse)
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
