const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const PostList = require.resolve('./src/templates/qs.tsx');
const Post = require.resolve('./src/templates/q.tsx');
const postListPath = '/q';

exports.onCreateNode = ({
  actions: { createNodeField },
  node,
}) => {
  fmImagesToRelative(node);

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: `${postListPath}/${node.frontmatter.slug}`,
    });
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
      path: i === 0 ?
        `${postListPath}` :
        `${postListPath}/${i + 1}`,
      component: PostList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        pagePath: postListPath,
      },
    });
  });

  // Posts
  posts.forEach(({
    previous: previousPost,
    node,
    next: nextPost,
  }) => {
    const { fields: { slug } } = node;

    createPage({
      path: slug,
      component: Post,
      context: {
        slug,
        previousPost,
        nextPost,
      },
    });
  });
};
