'use client'

import { useEffect } from 'react'

interface TwikooCommentsProperties {
  environmentId: string
}

function TwikooComments({ environmentId }: TwikooCommentsProperties) {
  useEffect(() => {
    import('twikoo')
      .then((twikoo: { init: (config: { envId: string, el: string }) => void }) => {
        twikoo.init({
          envId: environmentId,
          el: '#twikoo-comments',
        })
      })
      .catch((error) => {
        console.error('Failed to load Twikoo:', error)
      })
  }, [environmentId])

  return (
    <div
      id="twikoo-comments"
      className="font-sans"
    />
  )
}

export default TwikooComments
