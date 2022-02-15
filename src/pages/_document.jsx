import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload fonts */}
          <link rel="preload" as="font" type="font/woff2" href="/fonts/inter/Inter-roman.var.woff2?v=3.19" crossOrigin="anonymous" />
          <link rel="preload" as="font" type="font/woff2" href="/fonts/inter/Inter-italic.var.woff2?v=3.19" crossOrigin="anonymous" />

          {/* Favicon & friends */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" href="/logo.svg" type="image/svg+xml" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#14ebb9" />
          <meta name="theme-color" content="#0a0a0c" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
