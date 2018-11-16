import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

function filesByNameWithoutImageData(name) {
  return ({ node }) => node.name === name && node.childImageSharp === null
}

function getMetadataFiles(files) {
  const mdFiles = files.filter(
    ({ node }) =>
      node.ext === '.md' &&
      node.name !== 'index' &&
      files.find(filesByNameWithoutImageData(node.name))
  )

  return mdFiles
}

export default ({ data }) => {
  const post = data.markdownRemark
  const files = data.allFile.edges.filter(
    ({ node }) => node.childImageSharp !== null
  )
  const metadatum = getMetadataFiles(data.allFile.edges)

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {files.map(({ node }) => {
          const filename = `${node.name}${node.ext}`
          const metadata = metadatum.find(edge => edge.node.name === node.name)

          return (
            <div key={filename}>
              <a href={node.childImageSharp.original.src}>
                <img
                  alt={filename}
                  src={node.childImageSharp.resize.src}
                  srcSet={node.childImageSharp.sizes.srcSet}
                />
              </a>
              {Boolean(metadata) && (
                <p>
                  {metadata.node.childMarkdownRemark.frontmatter.description}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    allFile(filter: { relativePath: { regex: $slug } }) {
      edges {
        node {
          ext
          name
          childImageSharp {
            original {
              src
            }
            resize(width: 920) {
              src
            }
            sizes(maxWidth: 1240) {
              srcSet
            }
          }
          childMarkdownRemark {
            frontmatter {
              title
              description
              tags
              date
            }
          }
        }
      }
    }
  }
`
