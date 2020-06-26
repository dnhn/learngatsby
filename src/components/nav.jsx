import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

export default () => {
  const {
    site: { siteMetadata: { nav } },
  } = useStaticQuery(query);

  return (
    <nav>
      <ul>
        {nav.map(n => (
          <li key={n.path}>
            <AniLink
              paintDrip
              color="lightskyblue"
              to={n.path}
            >
              {n.name}
            </AniLink>
          </li>
        ))}
      </ul>
    </nav>
  )
};

const query = graphql`
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
`;
