const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const PostList = require.resolve('./src/templates/qs.jsx');
const Post = require.resolve('./src/templates/q.jsx');
const postPath = '/q';

exports.onCreateNode = ({
  actions: { createNodeField },
  node,
}) => {
  fmImagesToRelative(node);

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: `${postPath}/${node.frontmatter.slug}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const {
    data: { allMarkdownRemark: { edges: posts } }
  } = await graphql(`
    query {
      allMarkdownRemark(
        sort: {
          fields: [frontmatter___datetime],
          order: DESC
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
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

  const postsPerPage = 2;
  const numPages = Math.ceil(posts.length / postsPerPage);

  // Post list
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ?
        `${postPath}` :
        `${postPath}/${i + 1}`,
      component: PostList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        pagePath: postPath,
      },
    });
  });

  // Posts
  posts.forEach(({
    previous: previousPost,
    node: {
      id,
      fields: { slug },
    },
    next: nextPost,
  }) => {
    createPage({
      path: slug,
      component: Post,
      context: {
        id,
        previousPost,
        nextPost,
      },
    });
  });
};
