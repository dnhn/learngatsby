import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => (
  <Layout>
    <h2>Home</h2>
    <span>{data.allMarkdownRemark.totalCount} posts</span>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.fields.slug}>
          <h3>{node.frontmatter.title}</h3>
        </Link>
        <span>{node.frontmatter.date}</span>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "D MMMM, YYYY")
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
