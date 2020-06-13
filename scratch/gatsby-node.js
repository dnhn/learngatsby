const { createRemoteFileNode } = require('gatsby-source-filesystem');
const PostList = require.resolve('./src/templates/qs.tsx');
const Post = require.resolve('./src/templates/q.tsx');

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
      allMarkdownRemark(
        sort: {
          fields: [frontmatter___datetime],
          order: DESC
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              poster
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.edges;
  const postsPerPage = 2;
  const numPages = Math.ceil(posts.length / postsPerPage);

  // Post list
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/q` : `/q/${i + 1}`,
      component: PostList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
      },
    });
  });

  // Posts
  posts.forEach(({
    previous: previousPost,
    node,
    next: nextPost,
  }) => {
    const {
      fields: { slug },
      frontmatter: { poster },
    } = node;

    createPage({
      path: slug,
      component: Post,
      context: {
        slug: slug,
        poster: poster,
        previousPost,
        nextPost,
      },
    });
  });
};
