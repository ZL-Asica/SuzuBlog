'use client'

import { useEffect, useRef } from 'react'

interface DisqusCommentsProperties {
  disqusShortname: string
}

function DisqusComments({ disqusShortname }: DisqusCommentsProperties) {
  const disqusReference = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const disqusScript = document.createElement('script')
          disqusScript.src = `https://${disqusShortname}.disqus.com/embed.js`
          disqusScript.dataset.timestamp = `${Date.now()}`
          document.body.append(disqusScript)

          observer.disconnect() // Disconnect observer after loading script
        }
      },
      { threshold: 0.1 },
    )

    if (disqusReference.current) {
      observer.observe(disqusReference.current)
    }

    return () => observer.disconnect()
  }, [disqusShortname])

  return (
    <div
      id="disqus_thread"
      ref={disqusReference}
      className="mx-auto w-full font-sans"
    />
  )
}

export default DisqusComments
