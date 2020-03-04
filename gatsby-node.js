/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions;
  const result = await graphql(`
    query {
      runwith {
        getRuns {
          tag
        }
      }
    }
  `)

  result.data.runwith.getRuns.forEach(x => {
    createPage({
        path: x.tag,
        component: require.resolve(`./src/components/rundetails.js`),
        context: {
            tag: x.tag
        }
    })
  })
}
