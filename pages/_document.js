import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Own Your Path" key="title"/>
        <meta property="og:description" content="Chat with SARA from O.S.R." key="description"/>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/guttermade-llc/image/upload/v1674407484/Frame_29_cprrhl.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
