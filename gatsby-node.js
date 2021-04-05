const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Load templates
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const pageTemplate = path.resolve(`./src/templates/page.js`)

  // Get all Ghost blog posts sorted by date
  const result = await graphql(
    `
      {
        allGhostPost(sort: {fields: published_at, order: ASC}, limit: 1000) {
          edges {
            node {
              slug
              id
            }
          }
        }
        allGhostPage(sort: { order: ASC, fields: published_at }) {
          edges {
            node {
                slug
                url
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }


  const posts = result.data.allGhostPost.edges
  const pages = result.data.allGhostPage.edges

  posts.forEach(({ node }) => {
    node.url = `/blog/${node.slug}/`
    actions.createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.slug,
        // id: node.id,
        // previousPostId,
        // nextPostId
      },
    })
  })
  
  // Create pages
  pages.forEach(({ node }) => {
    // This part here defines, that our pages will use
    // a `/:slug/` permalink.
    node.url = `/${node.slug}/`

    createPage({
        path: node.url,
        component: pageTemplate,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.slug,
        },
    })
  })
}

