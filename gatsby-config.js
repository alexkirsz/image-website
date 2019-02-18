module.exports = {
  siteMetadata: {
    title: `IMAGE`,
    description: `Le site web de la majeure IMAGE d'EPITA.`,
    defaultLocale: "fr",
    locales: ["fr", "en"],
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `students`,
        path: `${__dirname}/people/students`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `teachers`,
        path: `${__dirname}/people/teachers`,
      },
    },
    {
      resolve: `@alexkirsz/gatsby-transformer-remark`,
      options: {
        filter: node => node.sourceInstanceName === "students",
        type: "Student",
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
              quality: 80,
              withWebp: true,
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    {
      resolve: `@alexkirsz/gatsby-transformer-remark`,
      options: {
        filter: node => node.sourceInstanceName === "teachers",
        type: "Teacher",
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
              quality: 80,
              withWebp: true,
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `IMAGE`,
        short_name: `IMAGE`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `src/images/logo_clear.svg`,
      },
    },
    {
      resolve: "gatsby-plugin-extract-schema",
      options: {
        dest: `${__dirname}/schema.json`,
      },
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        generateMatchPathRewrites: false,
      },
    },
  ],
};
