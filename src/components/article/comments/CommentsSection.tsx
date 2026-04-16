'use client'

import dynamic from 'next/dynamic'

const TwikooComments = dynamic(async () => import('./TwikooComments'))
const DisqusComments = dynamic(async () => import('./DisqusComments'))

interface CommentsSectionProps {
  walineServerURL?: string | null
  twikooEnvId?: string | null
  disqusShortname?: string | null
  path: string
}

export default function CommentsSection({
  walineServerURL: _walineServerURL,
  twikooEnvId,
  disqusShortname,
  path: _path,
}: CommentsSectionProps) {
  // 暂时只支持Twikoo和Disqus，Waline后续可以添加
  const hasTwikoo = twikooEnvId !== null && twikooEnvId !== undefined && twikooEnvId.trim() !== ''
  const hasDisqus = disqusShortname !== null && disqusShortname !== undefined && disqusShortname.trim() !== ''

  if (hasTwikoo === true) {
    return <TwikooComments environmentId={twikooEnvId} />
  }

  if (hasDisqus === true) {
    return <DisqusComments disqusShortname={disqusShortname} />
  }

  // 没有配置评论系统
  return null
}
