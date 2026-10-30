import type { CSSProperties } from 'react'
import { ZoomIn } from 'lucide-react'
import { CustomImage } from '@/components/ui'

/** Parses Discourse-style `Alt|640x360, wide` image metadata. */

type ImageLayout = 'center' | 'full' | 'left' | 'right' | 'thumbnail' | 'wide'

interface ImageMeta {
  alt: string
  height: number
  layout: ImageLayout
  width: number
  widthPercent?: number
}

interface MarkdownImageProps {
  alt?: string
  src?: string | Blob
}

const DEFAULT_IMAGE_META: ImageMeta = {
  alt: 'Image',
  height: 700,
  layout: 'center',
  width: 500,
}

const IMAGE_LAYOUTS = new Set<ImageLayout>([
  'center',
  'full',
  'left',
  'right',
  'thumbnail',
  'wide',
])

const parseImageMeta = (rawAlt: string): ImageMeta => {
  const [label = '', rawMeta = ''] = rawAlt.split('|', 2)
  const meta: ImageMeta = {
    ...DEFAULT_IMAGE_META,
    alt: label.trim() || DEFAULT_IMAGE_META.alt,
  }

  for (const token of rawMeta.split(',')) {
    const value = token.trim().toLowerCase()
    const dimensionMatch = /^(\d{1,5})x(\d{1,5})$/.exec(value)
    const percentMatch = /^(\d{1,3})%$/.exec(value)

    if (dimensionMatch != null) {
      meta.width = Number(dimensionMatch[1])
      meta.height = Number(dimensionMatch[2])
      continue
    }

    if (percentMatch != null) {
      meta.widthPercent = Math.min(Number(percentMatch[1]), 100)
      continue
    }

    if (IMAGE_LAYOUTS.has(value as ImageLayout)) {
      meta.layout = value as ImageLayout
    }
  }

  return meta
}

const getWrapperClassName = (layout: ImageLayout): string => {
  const baseClassName = 'my-6 block max-w-full break-words'

  switch (layout) {
    case 'full':
      return `${baseClassName} relative left-1/2 -ml-[50vw] w-screen px-4 sm:px-6`
    case 'left':
      return `${baseClassName} mb-4 max-w-full sm:float-left sm:mr-4 sm:max-w-[50%]`
    case 'right':
      return `${baseClassName} mb-4 max-w-full sm:float-right sm:ml-4 sm:max-w-[50%]`
    case 'thumbnail':
      return `${baseClassName} inline-block max-w-48 align-middle`
    case 'wide':
      return `${baseClassName} mx-auto w-full max-w-5xl`
    case 'center':
    default:
      return `${baseClassName} mx-auto text-center`
  }
}

const getImageClassName = (layout: ImageLayout): string => {
  const baseClassName = 'relative h-auto max-h-[500px] max-w-full rounded-md object-contain shadow-md transition duration-200 ease-[var(--markdown-ease)] group-hover/image:scale-[1.01] group-hover/image:shadow-lg lg:max-h-[700px] xl:max-h-[800px]'

  if (layout === 'thumbnail') {
    return `${baseClassName} w-full min-w-0`
  }

  if (layout === 'full' || layout === 'wide') {
    return `${baseClassName} mx-auto w-full`
  }

  return `${baseClassName} mx-auto w-auto min-w-[200px] lg:min-w-[300px] xl:min-w-[400px]`
}

const getButtonClassName = (layout: ImageLayout): string => {
  const baseClassName = 'group/image relative inline-flex max-w-full cursor-pointer overflow-hidden rounded-md align-middle outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  if (layout === 'full' || layout === 'wide') {
    return `${baseClassName} w-full justify-center`
  }

  return `${baseClassName} justify-center`
}

const getWrapperStyle = (meta: ImageMeta): CSSProperties | undefined => {
  if (meta.widthPercent == null) {
    return undefined
  }

  return { width: `${meta.widthPercent}%` }
}

export function MarkdownImage({
  alt = 'Image',
  src = '',
}: MarkdownImageProps) {
  const meta = parseImageMeta(alt)
  const imageSrc = typeof src === 'string' ? src : ''
  const showCaption = meta.alt !== DEFAULT_IMAGE_META.alt

  return (
    <span
      className={getWrapperClassName(meta.layout)}
      data-markdown-image=""
      data-markdown-image-layout={meta.layout}
      role="figure"
      aria-label={showCaption ? meta.alt : undefined}
      style={getWrapperStyle(meta)}
    >
      <button
        type="button"
        className={`${getButtonClassName(meta.layout)} markdown-image-preview-trigger`}
        data-markdown-image-preview=""
        data-markdown-image-src={imageSrc || undefined}
        aria-label={`Open image preview: ${meta.alt}`}
      >
        <CustomImage
          src={imageSrc}
          alt={meta.alt}
          width={meta.width}
          height={meta.height}
          priority={false}
          className={getImageClassName(meta.layout)}
        />
        <span
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 shadow-sm transition-opacity ease-[var(--markdown-ease)] group-hover/image:opacity-100 group-focus-visible/image:opacity-100"
          aria-hidden="true"
        >
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>

      {showCaption && (
        <span
          className="markdown-image-caption mt-2 block text-center text-sm leading-relaxed text-gray-500 dark:text-gray-400"
          data-image-caption=""
          title={meta.alt}
        >
          {meta.alt}
        </span>
      )}
    </span>
  )
}
