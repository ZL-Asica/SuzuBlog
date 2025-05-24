import { z } from 'zod'

export const friendLinkSchema = z.object({
  title: z.string().optional().describe('Link title'),
  link: z.string().url().describe('Link URL of the friend'),
  img: z.string().describe('Link image'),
  des: z.string().optional().describe('Link description'),
})

export type FriendLink = z.infer<typeof friendLinkSchema>
