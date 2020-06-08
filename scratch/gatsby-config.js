module.exports = {
  siteMetadata: {
    title: 'Scratch Gatsby',
    description: 'Build Gatsby from scratch',
  },
  plugins: [
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
    'gatsby-plugin-sass',
    'gatsby-plugin-layout',
  ],
};
