import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://digitalbaymediahub.vercel.app/sitemap.xml'
          />
          <link
            rel='icon'
            type='image/x-icon'
            href='/favicon.ico'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
          <meta name='googlebot' content='index,follow' />
          <meta name='revisit-after' content='1 days' />
          <meta
            name='robots'
            content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          />
            <meta
          name="keywords"
          content="moviefree, movie free 2024, free movie, free tv shows, watch movie online, free movies online, free movie streaming, movie free streaming, download free"
        />
        <meta
          property="og:keywords"
          content="JustWatch 2024,DigitalBay Media Hub, Justwatch US,JustWatch Tv Shows,JustWatch Webseries,JustWatch Movies,JustWatch 2024,Netflix Free,MovieRulz,7MovieRulz 2024,5MovieRulz."
        />
          <meta
            name='description'
            content='Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!'
          />
          <link
            rel='canonical'
            href='https://digitalbaymediahub.vercel.app/'
          />
          <meta property='og:locale' content='en_US' />
          <meta property='og:type' content='website' />
          <meta
            property='og:title'
            content='DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD'
          />
          <meta
            property='og:description'
            content='Explore the World of Digital Entertainment @ $1.00 USD – Books, Movies, Music, and More!'
          />
          <meta
            property='og:url'
            content='https://digitalbaymediahub.vercel.app/'
          />  
          <meta
            property='og:site_name'
            content='DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD'
          />
          <meta
            property='og:image'
            content='https://digitalbaymediahub.vercel.app/og_image.jpg'
          />
          <meta property='og:image:width' content='1280' />
          <meta property='og:image:height' content='720' />
          <meta property='og:image:type' content='image/webp' />
          <meta
            name='application-name'
            content='DigitalBay Media Hub™ - Digital Entertainment@ $1.00 USD'
          />
          <meta
            property='article:modified_time'
            content='2024-01-01T13:13:13+00:00'
          />
          <link
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
            href='https://digitalbaymediahub.vercel.app/sitemap.xml'
          />
          <meta name='twitter:card' content='summary_large_image' />
      
          <meta
            name='google-adsense-account'
            content='ca-pub-5527677677744511'
          />
          <meta
            name='google-site-verification'
            content='lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg'
          />
       
          <meta
            name='facebook-domain-verification'
            content='du918bycikmo1jw78wcl9ih6ziphd7'
          />
          <meta
            name='dailymotion-domain-verification'
            content='dmdzuqt3p027t2adn'
          />
          <meta name='monetag' content='35a75bbdeae678c82776e64fb78cdac5' />
       
        </Head>

        <body>
          <Main />
          <NextScript />
          {/* <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W62BF3BQ"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
