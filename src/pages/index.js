import React from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'
import Layout from '../components/layout'
import Collage from '../components/Collage'
import { PostDate } from '../components/PostDate'
import logo from '../images/logo.svg'

const Center = styled.div`
  height: 100%;
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

let Logo = styled.img`
  display: block;
  max-width: 200px;
  margin: 5rem auto;
`

let WordsContainer = styled.div`
  margin: 5rem 0;
`

let LatestWords = ({ posts }) => (
  <WordsContainer>
    <h1 style={{ color: 'rgb(127, 127, 125)' }}>Recent Writing</h1>
    {posts.map(post => (
      <div id={post.slug}>
        <h2
          style={{
            fontSize: '1.25rem',
          }}
        >
          <a href={post.slug}>{post.title}</a>
        </h2>
        <PostDate>Published: {post.date}</PostDate>
      </div>
    ))}
  </WordsContainer>
)

const IndexPage = ({ data }) => {
  let bloggyBois = data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node.fields,
    ...node.frontmatter,
  }))

  return (
    <Layout>
      <Center>
        <a href="/">
          <Logo src={logo} alt="bitwise" />
        </a>
        <Collage />
        <LatestWords posts={bloggyBois} />
      </Center>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark(filter: { fields: { collection: { eq: "words" } } }) {
      edges {
        node {
          fields {
            slug
            collection
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
`
