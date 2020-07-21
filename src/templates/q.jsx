import React from 'react';
import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { Helmet } from 'react-helmet';
import { Link, Meta } from 'react-head';

export default ({
  data: {
    site: { siteMetadata },
    markdownRemark: post,
  },
  pageContext: { previousPost, nextPost },
}) => (
  <div>
    <Helmet title={post.frontmatter.title} />
    <Meta
      property="og:url"
      content={`${siteMetadata.siteUrl}${post.fields.slug}`}
    />
    <Meta property="og:type" content="article" />
    <Meta property="og:title" content={post.frontmatter.title} />
    <Meta property="og:description" content={post.excerpt} />
    <Meta property="og:image" content="https://unsplash.it/640/320" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" content={post.frontmatter.title} />
    <Meta name="twitter:descrition" content={post.excerpt} />
    <Meta name="twitter:image" content="https://unsplash.it/640/320" />
    <Link
      rel="canonical"
      href={`${siteMetadata.siteUrl}${post.fields.slug}`}
    />

    {previousPost &&
      <>
        <Link
          rel="prefetch"
          href={`${siteMetadata.siteUrl}${previousPost.fields.slug}`}
          as="document"
        />
        <Link
          rel="prerender"
          href={`${siteMetadata.siteUrl}${previousPost.fields.slug}`}
        />
        <AniLink
          paintDrip
          color="lightskyblue"
          to={previousPost.fields.slug}
        >
          &lt; {previousPost.frontmatter.title}
        </AniLink>
      </>}
    <br />
    {nextPost &&
      <>
        <Link
          rel="prefetch"
          href={`${siteMetadata.siteUrl}${nextPost.fields.slug}`}
          as="document"
        />
        <Link
          rel="prerender"
          href={`${siteMetadata.siteUrl}${nextPost.fields.slug}`}
        />
        <AniLink
          paintDrip
          color="lightskyblue"
          to={nextPost.fields.slug}
        >
          {nextPost.frontmatter.title} &gt;
        </AniLink>
      </>}
    <h2>{post.frontmatter.title}</h2>
    <h4>{post.timeToRead} phút</h4>
    {post.frontmatter.poster && (
      <>
        {post.frontmatter.poster.local &&
          <img src={post.frontmatter.poster.local.publicURL} alt="" />}
        {post.frontmatter.poster.external &&
          <img src={post.frontmatter.poster.external} alt="" />}
      </>
    )}
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </div>
);

export const query = graphql`
query($id: String!) {
  site {
    siteMetadata {
      title
      siteUrl
    }
  }
  markdownRemark(id: { eq: $id }) {
    excerpt(pruneLength: 150)
    fields {
      slug
    }
    html
    timeToRead
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
  }
}
`;
