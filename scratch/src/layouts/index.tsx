import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Nav from '../components/nav';

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <main>
      <h1>{data.site.siteMetadata.title}</h1>
      <Nav />
      {children}
    </main>
  );
};
