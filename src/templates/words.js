import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from 'react-emotion'
import logo from '../images/logo.svg'
import { PostDate } from '../components/PostDate'

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

let Logo = styled.img`
  display: block;
  max-width: 200px;
  margin: 5rem auto;
`

export default ({ data, location }) => {
  const post = data.markdownRemark
  let html = post.html.replace(/<li>(.*)<\/li>/g, (_, ...matches) => {
    return '<li><span>'.concat(matches[0]).concat('</span></li>')
  })
  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.description}
    >
      <Helmet meta={[{ name: 'og:location', content: location.href }]} />
      <Container>
        <a href="/">
          <Logo src={logo} alt="bitwise" />
        </a>
        <h1>{post.frontmatter.title}</h1>
        <PostDate>Published: {post.frontmatter.date}</PostDate>
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
