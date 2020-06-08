const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: createFilePath({ node, getNode, basePath: 'pages' }),
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { fields: { slug } } = node;

    createPage({
      path: slug,
      component: require.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug: slug,
      },
    });
  });
};
