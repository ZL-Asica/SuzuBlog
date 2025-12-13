'use client'

import { copyToClipboard } from '@zl-asica/react/utils'
import { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface CodeBlockCopyProps {
  cleanedCode: string
  translation: Translation
}

const CodeBlockCopy = ({
  cleanedCode,
  translation,
}: CodeBlockCopyProps) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [busy, startCopy] = useTransition()
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleCopyClick = () => {
    if (busy) {
      return
    }
    startCopy(async () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
      try {
        await copyToClipboard(cleanedCode)
        setStatus('copied')
        toast.success(translation.post.copy.copied)
      }
      catch {
        setStatus('failed')
        toast.error(translation.post.copy.copyFailed)
      }
      finally {
        timerRef.current = window.setTimeout(() => setStatus('idle'), 2500)
      }
    })
  }

  const label
    = status === 'copied'
      ? translation.post.copy.copied
      : status === 'failed'
        ? translation.post.copy.copyFailed
        : translation.post.copy.copy

  return (
    <>
      <button
        type="button"
        onClick={handleCopyClick}
        disabled={busy}
        aria-label={translation.post.copy.copyAriaLabel}
        className={[
          'absolute -top-6 right-2 z-10 rounded-md px-2 py-1 text-xs font-medium',
          'transition-all-300 hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'text-background',
          status === 'copied' ? 'bg-primary-300 ' : 'bg-secondary-300',
        ].join(' ')}
      >
        <span className="min-w-18 inline-block text-center">{label}</span>
      </button>

      <span className="sr-only" aria-live="polite">
        {status === 'copied'
          ? translation.post.copy.copied
          : status === 'failed'
            ? translation.post.copy.copyFailed
            : ''}
      </span>
    </>
  )
}

export default CodeBlockCopy
