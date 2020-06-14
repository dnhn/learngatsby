import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export default () => {
  const {
    site: {
      siteMetadata: {
        title,
        description,
      },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <Helmet title={title}>
      <html lang="vi" />
      <meta name="description" content={description} />
      <link
        rel="icon"
        type="image/png"
        href="/logo.png"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://fonts.googleapis.com/css?family=Nunito:700|Lora:400,400i,700,700i|IBM+Plex+Mono:400&display=swap"
      />
    </Helmet>
  );
};
