import React from 'react';
import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

export default ({ data }) => (
  <div>
    {data.allMarkdownRemark.edges.map(({
      node: {
        id,
        fields: { slug },
        frontmatter,
        excerpt,
      },
    }) => (
      <div key={id}>
        <AniLink
          paintDrip
          color="lightskyblue"
          to={slug}
        >
          <h3>{frontmatter.title}</h3>
        </AniLink>
        {frontmatter.poster && (
          <>
            {frontmatter.poster.local &&
              <img src={frontmatter.poster.local.publicURL} alt="" />}
            {frontmatter.poster.external &&
              <img src={frontmatter.poster.external} alt="" />}
          </>
        )}
        <p>{excerpt}</p>
      </div>
    ))}
    <AniLink
      paintDrip
      color="lightskyblue"
      to="/q"
    >
      Tất cả bài viết
    </AniLink>
  </div>
);

export const query = graphql`
query {
  allMarkdownRemark(
    limit: 3,
    sort: {
      fields: [frontmatter___datetime],
      order: DESC
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          poster {
            local {
              publicURL
            }
            external
            alt
            title
          }
        }
        fields {
          slug
        }
        excerpt(pruneLength: 50)
      }
    }
  }
}
`;
