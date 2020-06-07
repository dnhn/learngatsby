import React from 'react';
import Nav from './nav';

export default ({ children }) => (
  <main>
    <Nav />
    {children}
  </main>
);
