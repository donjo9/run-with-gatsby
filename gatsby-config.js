module.exports = {
  siteMetadata: {
    title: `Run With Johnni`,
    description: `This is my personal Endomondo Lite, with data from my Forerunner 30`,
    author: `johnni.codes`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
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
        url: "https://api.run.with.johnni.ninja",
      },
    },
  ],
}
