import React from 'react';
import SEO from '../components/seo';
import Nav from '../components/nav';

export default ({ children }) => (
  <main>
    <SEO />
    <Nav />
    {children}
  </main>
);
