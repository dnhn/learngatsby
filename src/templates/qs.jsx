import React from 'react';
import { Link, graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

export default ({
  data: {
    allMarkdownRemark: {
      edges: posts,
      pageInfo,
    },
  },
  pageContext: { pagePath },
}) => (
  <div>
    {pageInfo.hasPreviousPage &&
      <AniLink
        fade
        duration={.5}
        to={`${pagePath}${pageInfo.currentPage <= 2 ? '' :
          `/${pageInfo.currentPage - 1}`}`}
      >
        Prev
      </AniLink>}
    page {pageInfo.currentPage} / {pageInfo.pageCount}
    {pageInfo.hasNextPage &&
      <AniLink
        fade
        duration={.5}
        to={`${pagePath}/${pageInfo.currentPage + 1}`}
      >
        Next
      </AniLink>}

    <div>
      {Array.from({ length: pageInfo.pageCount }, (_, i) => (
        <AniLink
          fade
          duration={.5}
          key={`pagi${i}`}
          to={`${pagePath}${i === 0 ? '' : `/${i + 1}`}`}
          style={{ display: 'inline-block', padding: 20 }}
          activeStyle={{ textDecoration: 'none', color: 'black' }}
        >
          {i + 1}
        </AniLink>
      ))}
    </div>

    {posts.map(({
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
        <p>{frontmatter.datetime}</p>
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
  </div>
);

export const query = graphql`
query(
  $limit: Int!,
  $skip: Int!
) {
  allMarkdownRemark(
    sort: {
      fields: [frontmatter___datetime],
      order: DESC
    },
    limit: $limit,
    skip: $skip
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
    pageInfo {
      currentPage
      hasNextPage
      hasPreviousPage
      itemCount
      pageCount
      perPage
      totalCount
    }
  }
}
`;
