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
