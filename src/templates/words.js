import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'react-emotion'
import logo from '../images/logo.svg'

let Container = styled.div`
  max-width: 45em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1em;
  padding-right: 1em;
`

let Content = styled.div`
  margin-bottom: 4em;
`

let Date = styled.p`
  color: #483e3e;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.9em;
  margin-bottom: 2rem;
`

let Logo = styled.img`
  display: block;
  max-width: 200px;
  margin: 5rem auto;
`

export default ({ data }) => {
  const post = data.markdownRemark
  let html = post.html.replace(/<li>(.*)<\/li>/g, (_, ...matches) => {
    return '<li><span>'.concat(matches[0]).concat('</span></li>')
  })
  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.description}
    >
      <Container>
        <a href="/">
          <Logo src={logo} alt="bitwise" />
        </a>
        <h1>{post.frontmatter.title}</h1>
        <Date>Published: {post.frontmatter.date}</Date>
        <Content dangerouslySetInnerHTML={{ __html: html }} />
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
        description
        date
      }
    }
  }
`
