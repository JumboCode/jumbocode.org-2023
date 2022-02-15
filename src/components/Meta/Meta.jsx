import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const CANONICAL_BASE = 'https://jumbocode.org/';

export default function Meta({
  pageTitle,
  titleSuffix = true,
  pageDescription,
  image,
  path,
}) {
  let suffix = '';
  if (typeof titleSuffix === 'string') suffix = titleSuffix;
  else if (titleSuffix) suffix = ' • JumboCode';

  const fullTitle = `${pageTitle}${suffix}`;
  const canonicalUrl = path && new URL(path, CANONICAL_BASE).href;

  return (
    <Head>
      {/* Title */}
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} key="og_title" />
      <meta name="twitter:title" content={fullTitle} key="twitter_title" />
      {/* Description */}
      {pageDescription && (
        <>
          <meta name="description" content={pageDescription} key="description" />
          <meta property="og:description" content={pageDescription} key="og_description" />
          <meta
            property="twitter:description"
            content={pageDescription}
            key="twitter_description"
          />
        </>
      )}
      {/* Canonical URL */}
      {canonicalUrl && (
        <>
          <link rel="canonical" href={canonicalUrl} key="canonical" />
          <meta property="og:url" content={canonicalUrl} key="og_url" />
        </>
      )}
      {/* Meta images */}
      {image && (
        <>
          <meta property="og:image" content={image.url || image} key="og_image" />
          <meta name="twitter:image" content={image.url || image} key="twitter_image" />
          <meta name="twitter:image:alt" content={image.url || image} key="twitter_image_alt" />
          <meta name="twitter:card" content="summary_large_image" key="twitter_card_type" />
          {typeof image === 'object' && (
            <>
              <meta property="og:image:alt" content={image.alt} key="og_image_alt" />
              <meta property="og:image:width" content={image.dimensions[0]} key="og_image_width" />
              <meta property="og:image:height" content={image.dimensions[1]} key="og_image_height" />
            </>
          )}
        </>
      )}
    </Head>
  );
}

Meta.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  titleSuffix: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  pageDescription: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ]),
  twitterImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  path: PropTypes.string,
};
Meta.defaultProps = {
  titleSuffix: true,
  pageDescription: null,
  image: null,
  twitterImage: null,
  path: null,
};
