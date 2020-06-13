import React from 'react';
import { Link, graphql } from 'gatsby';

export default ({ data }) => (
  <div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.fields.slug}>
          <h3>{node.frontmatter.title}</h3>
        </Link>
        <p>{node.excerpt}</p>
      </div>
    ))}
    <Link to="/q">Tất cả bài viết</Link>
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
