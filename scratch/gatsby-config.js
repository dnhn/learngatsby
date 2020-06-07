module.exports = {
  siteMetadata: {
    title: 'Scratch Gatsby',
    description: 'Build Gatsby from scratch',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-remark',
  ],
};
