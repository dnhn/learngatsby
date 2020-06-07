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
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
  ],
};
