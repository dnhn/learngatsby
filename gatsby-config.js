require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const {
  GATSBY_ALGOLIA_APP_ID,
  GATSBY_ALGOLIA_API_KEY,
  GATSBY_ALGOLIA_INDEX_NAME,
} = process.env;
const algoliaQueries = require('./src/utils/algolia');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://modest-shirley-77a925.netlify.app',
    title: 'Qs',
    description: 'Build Gatsby from scratch',
    author: 'N',
    nav: [
      { path: '/', name: '[-1]' },
      { path: '/q', name: '*' },
      { path: '/me', name: 'Tôi' },
      { path: '/tim', name: 'Tìm' },
    ],
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-head',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        htmlTitle: 'CMS',
        modulePath: `${__dirname}/src/cms/cms.js`,
        publicPath: 'cms',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        layout: require.resolve('./src/layouts/index.jsx'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: '#',
              removeAccents: true,
            },
          },
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              disableBgImageOnAlpha: true,
              linkImagesToOriginal: false,
              showCaptions: true,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: f => `static/${f.name}`,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: GATSBY_ALGOLIA_APP_ID,
        apiKey: GATSBY_ALGOLIA_API_KEY,
        indexName: GATSBY_ALGOLIA_INDEX_NAME,
        queries: algoliaQueries(GATSBY_ALGOLIA_INDEX_NAME),
        chunkSize: 5000,
        enablePartialUpdates: true,
        matchFields: ['slug', 'modified'],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            title: 'Qs RSS Feed',
            output: 'rss.xml',
            query: `
              {
                allMarkdownRemark(
                  sort: {
                    fields: [frontmatter___datetime]
                    order: DESC,
                  }
                ) {
                  edges {
                    node {
                      frontmatter {
                        title
                        datetime
                      }
                      fields {
                        slug
                      }
                      excerpt
                      html
                    }
                  }
                }
              }
            `,
            serialize: ({
              query: {
                site: { siteMetadata: { siteUrl } },
                allMarkdownRemark,
              },
            }) =>
              allMarkdownRemark.edges.map(({
                node: {
                  frontmatter,
                  excerpt,
                  fields: { slug },
                  html,
                },
              }) => ({
                ...frontmatter,
                description: excerpt,
                url: siteUrl + slug,
                guid: siteUrl + slug,
                custom_elements: [{ 'content:encoded': html }],
              })),
          },
        ],
      },
    },
    'gatsby-plugin-netlify', // keep at the end of array
  ],
};
