const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

function relativePathToSlug({ path, ext }) {
  const pathWithoutExtension = path.slice(0, path.length - ext.length)
  return `/${pathWithoutExtension}/`
}

function shouldCreatePage({ node, files }) {
  if (node.fields.collection === 'content') {
    const potentialMetadata = files.find(
      ({ node: fileNode }) =>
        node.fields.slug ===
        relativePathToSlug({
          path: fileNode.relativePath,
          ext: fileNode.ext,
        })
    )

    if (potentialMetadata && potentialMetadata.node.name !== 'index') {
      /**
       * This isn't an `index.md` file, so it must be metadata.
       * Don't create the page!
       */
      return false
    }
  }

  return true
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent)
    const slug = createFilePath({ node, getNode, basePath: 'pages' })

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    createNodeField({
      node,
      name: 'collection',
      value: parent.relativeDirectory.split('/')[0],
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                collection
              }
            }
          }
        }
        allFile(filter: { sourceInstanceName: { eq: "content" } }) {
          edges {
            node {
              ext
              name
              relativePath
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            `./src/templates/${node.fields.collection}.js`
          ),
          context: {
            // these are available as GQL variables in page queries
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
