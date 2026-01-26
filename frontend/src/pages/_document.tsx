import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/icons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="canonical" href="https://anna-egypt.com/" />
        <meta charSet="UTF-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
