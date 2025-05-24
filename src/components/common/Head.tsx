import type { HeadLink } from '@/schemas'
import { assignUUID } from '@zl-asica/react/utils'
import Script from 'next/script'

interface HeadProps {
  rss: null | boolean
  siteUrl: string
  headerJavascript: string[]
  googleAnalytics: null | string
  links: HeadLink[]
}

const Head = async ({
  rss,
  siteUrl,
  headerJavascript,
  googleAnalytics,
  links,
}: HeadProps) => {
  return (
    <>
      {assignUUID(links).map(link => (
        <link
          key={link.id}
          rel={link.rel}
          type={link.type}
          href={link.href}
          sizes={link.sizes}
        />
      ))}

      {/* If rss set in config */}
      {rss !== null
        && String(rss) !== 'false'
        && (
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed"
            href={`${siteUrl}/feed.xml`}
          />
        )}
      {/* Custom js */}
      {headerJavascript.map(jsFile => (
        <Script key={jsFile} src={jsFile} strategy="afterInteractive" />
      ))}
      {/* Google Analytics Script */}
      {googleAnalytics !== null && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${googleAnalytics}');
          `}
          </Script>
        </>
      )}
    </>
  )
}

export default Head
