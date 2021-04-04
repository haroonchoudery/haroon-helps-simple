const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all Ghost blog posts sorted by date
  const result = await graphql(
    `
      {
        allGhostPost(sort: { order: ASC, fields: published_at }) {
            edges {
                node {
                    slug
                }
            }
        }
        allGhostTag(sort: { order: ASC, fields: name }) {
            edges {
                node {
                    slug
                    url
                    postCount
                }
            }
        }
        allGhostAuthor(sort: { order: ASC, fields: name }) {
            edges {
                node {
                    slug
                    url
                    postCount
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

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  const tags = result.data.allGhostTag.edges
  const authors = result.data.allGhostAuthor.edges
  const pages = result.data.allGhostPage.edges
  const posts = result.data.allGhostPost.edges

  // Define a template for blog post
  const indexTemplate = path.resolve(`./src/templates/blog-post.js`)
  const tagsTemplate = path.resolve(`./src/templates/blog-post.js`)
  const authorTemplate = path.resolve(`./src/templates/blog-post.js`)
  const pageTemplate = path.resolve(`./src/templates/blog-post.js`)
  const postTemplate = path.resolve(`./src/templates/blog-post.js`)

    // Create tag pages
  tags.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0

    // This part here defines, that our tag pages will use
    // a `/tag/:slug/` permalink.
    const url = `/tag/${node.slug}`

    const items = Array.from({length: totalPosts})

    // Create pagination
    paginate({
        createPage,
        items: items,
        itemsPerPage: postsPerPage,
        component: tagsTemplate,
        pathPrefix: ({ pageNumber }) => (pageNumber === 0) ? url : `${url}/page`,
        context: {
            slug: node.slug
        }
    })
  })

  // Create author pages
  authors.forEach(({ node }) => {
      const totalPosts = node.postCount !== null ? node.postCount : 0

      // This part here defines, that our author pages will use
      // a `/author/:slug/` permalink.
      const url = `/author/${node.slug}`

      const items = Array.from({length: totalPosts})

      // Create pagination
      paginate({
          createPage,
          items: items,
          itemsPerPage: postsPerPage,
          component: authorTemplate,
          pathPrefix: ({ pageNumber }) => (pageNumber === 0) ? url : `${url}/page`,
          context: {
              slug: node.slug
          }
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

  // Create post pages
  posts.forEach(({ node }) => {
      // This part here defines, that our posts will use
      // a `/:slug/` permalink.
      node.url = `/${node.slug}/`

      createPage({
          path: node.url,
          component: postTemplate,
          context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.slug,
          },
      })
  })

  // Create pagination
  paginate({
      createPage,
      items: posts,
      itemsPerPage: postsPerPage,
      component: indexTemplate,
      pathPrefix: ({ pageNumber }) => {
          if (pageNumber === 0) {
              return `/`
          } else {
              return `/page`
          }
      },
  })
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog posts are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       twitter: String
//     }

//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: Fields
//     }

//     type Frontmatter {
//       title: String
//       description: String
//       date: Date @dateformat
//     }

//     type Fields {
//       slug: String
//     }
//   `)
// }
