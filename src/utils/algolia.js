const query = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/posts/" } },
    sort: {
      fields: [frontmatter___datetime],
      order: ASC
    }
  ) {
    nodes {
      objectID: id
      fields { path: slug }
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
}`;

const flatten = arr =>
  arr.map(({ fields, frontmatter, ...rest }) => ({
    ...fields,
    ...frontmatter,
    ...rest,
  }));

const settings = { attributesToSnippet: [`excerpt:20`] };

module.exports = indexName => [
  {
    query,
    transformer: ({ data: { posts } }) => flatten(posts.nodes),
    indexName,
    settings,
  },
];
