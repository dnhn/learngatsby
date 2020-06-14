import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { googleFonts } from '../utils/constant';

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
    <Helmet>
      <link
        rel="stylesheet"
        type="text/css"
        href={googleFonts}
        media="print"
        onload="this.media='all'"
      />
    </Helmet>
  );
};
