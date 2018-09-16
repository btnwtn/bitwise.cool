import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <h1>Hi people</h1>
      {posts.map(({ node: post }) => (
        <Link to={post.fields.slug} key={post.id}>
          {post.frontmatter.title}
        </Link>
      ))}
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
          excerpt(pruneLength: 80)
        }
      }
    }
  }
`

export default IndexPage
