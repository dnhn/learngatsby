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
  const googleFonts = 'https://fonts.googleapis.com/css?family=' +
    'Nunito:700|Lora:400,400i,700,700i|IBM+Plex+Mono:400' +
    '&display=swap';

  return (
    <Helmet
      htmlAttributes={{ lang: 'vi' }}
      title={title}
      meta={[
        { name: 'description', content: description },
      ]}
    >
      {/**
        * Google fonts loading optimisation
        * https://csswizardry.com/2020/05/the-fastest-google-fonts
        * */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      />
      <link
        rel="preload"
        as="style"
        href={googleFonts}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={googleFonts}
        media="print"
        onload="this.media='all'"
      />
      <noscript>
        {`<link
          rel="stylesheet"
          type="text/css"
          href="${googleFonts}"
        />`}
      </noscript>
      {/* End Google fonts */}

      <link
        rel="icon"
        type="image/png"
        href="/logo.png"
      />
    </Helmet>
  );
};
