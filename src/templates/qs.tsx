import React from 'react';
import { Link, graphql } from 'gatsby';

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
      <Link to={`${pagePath}${pageInfo.currentPage <= 2 ? '' : `/${pageInfo.currentPage - 1}`}`}>
        Prev
      </Link>}
    page {pageInfo.currentPage} / {pageInfo.pageCount}
    {pageInfo.hasNextPage &&
      <Link to={`${pagePath}/${pageInfo.currentPage + 1}`}>
        Next
      </Link>}

    <div>
      {Array.from({ length: pageInfo.pageCount }, (_, i) => (
        <Link
          key={`pagi${i}`}
          to={`${pagePath}${i === 0 ? '' : `/${i + 1}`}`}
          style={{ display: 'inline-block', padding: 20 }}
          activeStyle={{ textDecoration: 'none', color: 'black' }}
        >
          {i + 1}
        </Link>
      ))}
    </div>

    {posts.map(({ node }) => (
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
