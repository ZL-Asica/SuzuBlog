import Image from 'next/image'
import SocialMediaLinks from '@/components/common/SocialMediaLinks'
import { buildWebsiteJsonLd } from '@/lib/buildJsonLd'
import { getConfig } from '@/services/config'

async function Home() {
  const config = getConfig()

  const jsonLd = buildWebsiteJsonLd({
    title: config.title,
    description: config.description,
    urlPath: '/',
    image: config.avatar,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-center justify-center px-6 pb-12">
        <div className="mt-[10vh] flex flex-col items-center justify-center">
          <Image
            src={config.avatar}
            alt="Avatar"
            width={180}
            height={180}
            className="rounded-full border-4 border-primary-300 shadow-lg dark:border-primary-200"
            priority
          />
          <p
            id="site-slogan"
            className="mt-10 sm:mt-14 md:mt-20 text-center text-balance text-3xl font-semibold text-foreground mb-16"
          >
            {config.slogan}
          </p>
          <SocialMediaLinks socialMedia={config.socialMedia} iconSize={40} />
        </div>
      </div>
    </>
  )
}

export default Home
