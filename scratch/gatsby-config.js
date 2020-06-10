module.exports = {
  siteMetadata: {
    title: 'Scratch Gatsby',
    description: 'Build Gatsby from scratch',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-layout',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-external-links',
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
              destinationDir: f => `static/${f.hash}/${f.name}`,
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
    }
  ],
};
