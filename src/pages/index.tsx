import React from 'react';
import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

export default ({ data }) => (
  <div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <AniLink
          paintDrip
          color="lightskyblue"
          to={node.fields.slug}
        >
          <h3>{node.frontmatter.title}</h3>
        </AniLink>
        <p>{node.excerpt}</p>
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
