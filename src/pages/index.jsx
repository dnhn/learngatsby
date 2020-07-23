import React from 'react';
import { Link, graphql } from 'gatsby';
import { Link as HeadLink, Meta } from 'react-head';

export default ({
  data: {
    allMarkdownRemark: posts,
    site: { siteMetadata },
  },
}) => (
  <div>
    <Meta property="og:url" content={siteMetadata.siteUrl} />
    <Meta property="og:type" content="website" />
    <Meta property="og:title" content={siteMetadata.title} />
    <Meta property="og:description" content={siteMetadata.description} />
    <Meta property="og:image" content={`${siteMetadata.siteUrl}/logo.png`} />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" content={siteMetadata.title} />
    <Meta name="twitter:descrition" content={siteMetadata.description} />
    <Meta name="twitter:image" content={`${siteMetadata.siteUrl}/logo.png`} />
    <HeadLink rel="canonical" href={siteMetadata.siteUrl} />

    {posts.edges.map(({
      node: {
        id,
        fields: { slug },
        frontmatter,
        excerpt,
      },
    }) => (
      <div key={id}>
        <Link to={slug}>
          <h3>{frontmatter.title}</h3>
        </Link>
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
    <Link to="/q">
      Tất cả bài viết
    </Link>
  </div>
);

export const query = graphql`
query {
  site {
    siteMetadata {
      siteUrl
      title
      description
    }
  }
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
