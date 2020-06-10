import React from 'react';
import { Link } from 'gatsby';

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Blog</Link>
      </li>
      <li>
        <Link to="/about">Giới thiệu</Link>
      </li>
    </ul>
  </nav>
);
