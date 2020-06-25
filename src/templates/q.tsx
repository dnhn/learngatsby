import React from 'react';
import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { Helmet } from 'react-helmet';
import Img from 'gatsby-image';

export default ({
  data: { markdownRemark: post },
  pageContext: { previousPost, nextPost },
}) => (
  <div>
    <Helmet title={post.frontmatter.title} />
    {previousPost &&
      <AniLink
        paintDrip
        color="lightskyblue"
        to={previousPost.fields.slug}
      >
        &lt; {previousPost.frontmatter.title}
      </AniLink>}
    <br />
    {nextPost &&
      <AniLink
        paintDrip
        color="lightskyblue"
        to={nextPost.fields.slug}
      >
        {nextPost.frontmatter.title} &gt;
      </AniLink>}
    <h2>{post.frontmatter.title}</h2>
    <h4>{post.timeToRead} phút</h4>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </div>
);

export const query = graphql`
query($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
    }
    timeToRead
  }
}
`;
