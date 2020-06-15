const query = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/posts/" } },
    sort: {
      fields: [frontmatter___datetime],
      order: ASC
    }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          slug
          datetime(
            formatString: "D MMMM, YYYY",
            locale: "vi"
          )
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));

const settings = { attributesToSnippet: [`excerpt:20`] };

module.exports = indexName => [
  {
    query,
    transformer: ({ data: { posts } }) => flatten(posts.edges),
    indexName,
    settings,
  },
];
