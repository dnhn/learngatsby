import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export default () => {
  const {
    site: { siteMetadata: { title } },
  } = useStaticQuery(query);

  return (
    <Helmet
      titleTemplate={`%s — ${title}`}
    />
  );
};

const query = graphql`
query {
  site {
    siteMetadata { title }
  }
}
`;
