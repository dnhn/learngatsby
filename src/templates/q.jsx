import React from 'react';
import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { Helmet } from 'react-helmet';
import { Link as HeadLink, Meta } from 'react-head';
import { randomRange } from '../utils/helper';

const unsplashRandom =
  `https://unsplash.it/${randomRange(200, 400)}/${randomRange(200, 400)}`;

export default ({
  data: {
    site: { siteMetadata },
    markdownRemark: post,
  },
  pageContext: { previousPost, nextPost },
}) => (
  <div>
    <Helmet title={post.frontmatter.title}>
      <script type="application/ld+json">
        {`{
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${siteMetadata.siteUrl}${post.fields.slug}"
          },
          "headline": "${post.frontmatter.title}",
          "description": "${post.excerpt.replace('\n', ' ')}",
          "dateCreated": "${post.frontmatter.ldDatetime}",
          "datePublished": "${post.frontmatter.ldDatetime}",
          "dateModified": "${post.frontmatter.ldDatetime}",
          "author": {
            "@type": "Person",
            "name": "${siteMetadata.author}"
          },
          "image": "${post.frontmatter.poster && (
            post.frontmatter.poster.external ?
              post.frontmatter.poster.external :
              post.frontmatter.poster.local ?
                `${siteMetadata.siteUrl}${post.frontmatter.poster.local.publicURL}` : ''
          )}"
        }`}
      </script>
      <script type="application/ld+json">
        {`{
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@id": "${siteMetadata.siteUrl}",
                "name": "${siteMetadata.title}"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": "${siteMetadata.siteUrl}/q",
                "name": "Qs"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${post.frontmatter.title}"
            }
          ]
        }`}
      </script>
    </Helmet>
    <Meta
      property="og:url"
      content={`${siteMetadata.siteUrl}${post.fields.slug}`}
    />
    <Meta property="og:type" content="article" />
    <Meta property="og:title" content={post.frontmatter.title} />
    <Meta property="og:description" content={post.excerpt} />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" content={post.frontmatter.title} />
    <Meta name="twitter:descrition" content={post.excerpt} />

    {post.frontmatter.poster ? (
      <>
        {post.frontmatter.poster.external &&
          <>
            <Meta property="og:image" content={post.frontmatter.poster.external} />
            <Meta name="twitter:image" content={post.frontmatter.poster.external} />
          </>}
        {post.frontmatter.poster.local &&
          <>
            <Meta
              property="og:image"
              content={`${siteMetadata.siteUrl}${post.frontmatter.poster.local.publicURL}`}
            />
            <Meta
              name="twitter:image"
              content={`${siteMetadata.siteUrl}${post.frontmatter.poster.local.publicURL}`}
            />
          </>}
      </>
    ) : (
      <>
        <Meta property="og:image" content={unsplashRandom} />
        <Meta name="twitter:image" content={unsplashRandom} />
      </>
    )}

    <HeadLink
      rel="canonical"
      href={`${siteMetadata.siteUrl}${post.fields.slug}`}
    />

    {previousPost &&
      <>
        <HeadLink
          rel="prefetch"
          href={`${siteMetadata.siteUrl}${previousPost.fields.slug}`}
          as="document"
        />
        <HeadLink
          rel="prerender"
          href={`${siteMetadata.siteUrl}${previousPost.fields.slug}`}
        />
        <AniLink
          swipe
          direction="right"
          entryOffset={100}
          duration={.5}
          to={previousPost.fields.slug}
        >
          &lt; {previousPost.frontmatter.title}
        </AniLink>
      </>}
    <br />
    {nextPost &&
      <>
        <HeadLink
          rel="prefetch"
          href={`${siteMetadata.siteUrl}${nextPost.fields.slug}`}
          as="document"
        />
        <HeadLink
          rel="prerender"
          href={`${siteMetadata.siteUrl}${nextPost.fields.slug}`}
        />
        <AniLink
          swipe
          direction="left"
          entryOffset={100}
          duration={.5}
          to={nextPost.fields.slug}
        >
          {nextPost.frontmatter.title} &gt;
        </AniLink>
      </>}
    <h2>{post.frontmatter.title}</h2>
    <h4>{post.timeToRead} phút</h4>
    {post.frontmatter.poster && (
      <>
        {post.frontmatter.poster.external &&
          <img src={post.frontmatter.poster.external} alt="" />}
        {post.frontmatter.poster.local &&
          <img src={post.frontmatter.poster.local.publicURL} alt="" />}
      </>
    )}
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </div>
);

export const query = graphql`
query($id: String!) {
  site {
    siteMetadata {
      author
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
      datetime(
        formatString: "D MMMM, YYYY",
        locale: "vi"
      )
      ldDatetime: datetime(formatString: "YYYY-MM-DD")
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
