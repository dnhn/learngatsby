import React from 'react';
import SEO from '../components/seo';
import Nav from '../components/nav';
import Autocomplete from '../components/autocomplete';

export default ({ children, location }) => (
  <main>
    <SEO />
    <Nav />
    <Autocomplete location={location} />
    {children}
  </main>
);
