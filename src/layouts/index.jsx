import React, { Suspense, lazy } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { isSSR } from '../utils/helper';

const Nav = lazy(() => import('../components/nav'));
const Autocomplete = lazy(() => import('../components/autocomplete'));

export default ({
  children,
  location,
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query);

  return (
    <main>
      <Helmet titleTemplate={`%s — ${siteMetadata.title}`}/>
      {!isSSR && (
        <Suspense fallback={`Loading…`}>
          <Nav/>
          <Autocomplete location={location}/>
        </Suspense>
      )}
      {children}
    </main>
  );
};

const query = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
}
`;
