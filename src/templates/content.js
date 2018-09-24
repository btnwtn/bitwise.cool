import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const post = data.markdownRemark
  const files = data.allFile.edges

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {files.map(({ node }) => (
          <img src={node.publicURL} />
        ))}
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
    allFile(
      filter: { relativePath: { regex: $slug }, extension: { ne: "md" } }
    ) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`
