import React from 'react';
import { Link, graphql } from 'gatsby';

export default ({ data }) => (
  <div>
    <h2>{data.allMarkdownRemark.totalCount} bài viết</h2>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.fields.slug}>
          <h3>{node.frontmatter.title}</h3>
        </Link>
        <span>{node.frontmatter.datetime}</span>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </div>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___datetime],
        order: DESC
      }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            datetime(
              formatString: "D MMMM, YYYY",
              locale: "vi"
            )
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
