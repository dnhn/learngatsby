import React, { Suspense, lazy } from 'react';
import SEO from '../components/seo';
import { isSSR } from '../utils/helper';

const Nav = lazy(() => import('../components/nav'));
const Autocomplete = lazy(() => import('../components/autocomplete'));

export default ({ children, location }) => (
  <main>
    <SEO />
    {!isSSR && (
      <Suspense fallback={`Loading…`}>
        <Nav />
        <Autocomplete location={location} />
      </Suspense>
    )}
    {children}
  </main>
);
