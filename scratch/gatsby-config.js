module.exports = {
  siteMetadata: {
    title: 'Scratch Gatsby',
    description: 'Build Gatsby from scratch',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-layout',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-external-links'],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    }
  ],
};
