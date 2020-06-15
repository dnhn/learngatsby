import React from 'react';
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Img from 'gatsby-image';

export default ({
  data: {
    markdownRemark: post,
    file,
  },
  pageContext: { previousPost, nextPost },
}) => (
  <div>
    <Helmet title={post.frontmatter.title} />
    {previousPost &&
      <Link to={previousPost.fields.slug}>
        &lt; {previousPost.frontmatter.title}
      </Link>}
    <br />
    {nextPost &&
      <Link to={nextPost.fields.slug}>
        {nextPost.frontmatter.title} &gt;
      </Link>}
    {file &&
      <Img
        fluid={file.childImageSharp.fluid}
        alt={post.frontmatter.title}
      />}
    {post.posterExt &&
      <Img
        fluid={post.posterExt.childImageSharp.fluid}
        alt={post.frontmatter.title}
      />}
    <h2>{post.frontmatter.title}</h2>
    <h4>{post.timeToRead} phút</h4>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </div>
);

export const query = graphql`
query($slug: String!, $poster: String) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
    }
    posterExt {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    timeToRead
  }
  file(relativePath: { eq: $poster }) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;
