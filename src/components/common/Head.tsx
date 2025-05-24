import Script from 'next/script'

interface HeadProps {
  rss: null | boolean
  siteUrl: string
  headerJavascript: string[]
  googleAnalytics: null | string
}

const Head = async ({
  rss,
  siteUrl,
  headerJavascript,
  googleAnalytics,
}: HeadProps) => {
  return (
    <>
      {/* icons */}
      <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

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
