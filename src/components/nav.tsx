import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

export default () => {
  const {
    site: { siteMetadata: { nav } },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          nav {
            path
            name
          }
        }
      }
    }
  `);

  return (
    <nav>
      <ul>
        {nav.map(n => (
          <li key={n.path}>
            <Link to={n.path}>{n.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};
