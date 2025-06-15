import { NextResponse } from 'next/server'
import { z } from 'zod'
import { AnimeResponseSchema } from '@/schemas'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userName = searchParams.get('userName')?.trim() ?? ''

    if (userName.length <= 1) {
      return NextResponse.json({ error: 'Username Issue' }, { status: 400 })
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
      }    `

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
      return NextResponse.json({ error: 'Upstream API error' }, { status: 502 })
    }

    const data = await response.json() as unknown

    const parsedResponse = AnimeResponseSchema.parse(data)

    return NextResponse.json(parsedResponse)
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation error:', error.errors)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
