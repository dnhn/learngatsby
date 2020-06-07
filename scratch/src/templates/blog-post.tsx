import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data: { markdownRemark: post } }) => (
  <Layout>
    <h2>{post.frontmatter.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
