import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const post = data.markdownRemark
  const files = data.allFile.edges.filter(
    ({ node }) => node.childImageSharp !== null
  )
  const metadatum = data.allFile.edges.filter(
    ({ node }) => node.name !== 'index'
  )

  debugger

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {files.map(({ node }) => {
          const filename = `${node.name}${node.ext}`

          return (
            <div key={filename}>
              <a href={node.childImageSharp.original.src}>
                <img
                  alt={filename}
                  src={node.childImageSharp.resize.src}
                  srcSet={node.childImageSharp.sizes.srcSet}
                />
              </a>
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
        }
      }
    }
  }
`
