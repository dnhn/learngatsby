const { createRemoteFileNode } = require('gatsby-source-filesystem');
const BlogPost = require.resolve('./src/templates/blog-post.tsx');

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type MarkdownRemark implements Node {
      posterExt: File @link(from: "posterExt___NODE")
    }
  `);
};

exports.onCreateNode = async ({
  actions: { createNode, createNodeField },
  cache,
  createNodeId,
  node,
  store,
}) => {
  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: `/q/${node.frontmatter.slug}`,
    });

    if (node.frontmatter.posterExt) {
      const fileNode = await createRemoteFileNode({
        url: node.frontmatter.posterExt,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store,
      });

      if (fileNode) {
        node.posterExt___NODE = fileNode.id;
      }
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___datetime], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              poster
            }
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      fields: { slug },
      frontmatter: { poster },
    } = node;

    createPage({
      path: slug,
      component: BlogPost,
      context: {
        slug: slug,
        poster: poster,
      },
    });
  });
};
