import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Own Your Path" key="title"/>
        <meta property="og:description" content="Chat with SARA from O.S.R." key="description"/>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/guttermade-llc/image/upload/v1674429270/SARA_free-file_1_1_zu7ja0.png"
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
