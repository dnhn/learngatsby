import React, { Suspense, lazy } from 'react';
import { isSSR } from '../utils/constant';

const SEO = lazy(() => import('../components/seo'));
const Nav = lazy(() => import('../components/nav'));
const Autocomplete = lazy(() => import('../components/autocomplete'));

export default ({ children, location }) => (
  <main>
    {!isSSR && (
      <Suspense fallback={`Loading…`}>
        <SEO />
        <Nav />
        <Autocomplete location={location} />
        {children}
      </Suspense>
    )}
  </main>
);
