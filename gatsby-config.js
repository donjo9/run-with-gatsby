module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Run With Johnni`,
        short_name: `RunWith`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/run-icon.png`, // This path is relative to the root of the site.
      },
    },
    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "RunWithAPI",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "runwith",
        // Url to query from
        url: "https://run.with.johnni.ninja/api",
      },
    },
  ],
}
