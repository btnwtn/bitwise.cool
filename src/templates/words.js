import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'react-emotion'

let Container = styled.div`
  background: red;
  max-width: 45em;
  margin-left: auto;
  margin-right: auto;
`

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout title={post.frontmatter.title}>
      <Container>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
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
  }
`
