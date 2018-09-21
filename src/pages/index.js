import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'react-emotion'

const images = [
  'https://images.unsplash.com/photo-1537168113816-8fd3aec5fb15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=622409e4400da813a5ac9a172da47787&auto=format&fit=crop&w=934&q=80',

  'https://images.unsplash.com/photo-1478733672327-ce27bc999503?ixlib=rb-0.3.5&s=df73875c13d5fd8f149016c6bd3bb085&auto=format&fit=crop&w=1533&q=80',

  'https://images.unsplash.com/photo-1476292026003-1df8db2694b8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f517acef521da794eab734cc069e24bf&auto=format&fit=crop&w=1534&q=80',

  'https://images.unsplash.com/photo-1425100599170-85ec4f00a6ee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=001a54591ed360dd4c27fa9d483212f4&auto=format&fit=crop&w=1350&q=80',
]

const Grid = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  display: block;
`

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Grid>
        {images.map(src => {
          return <Image key={src} src={src} alt="hi" />
        })}
      </Grid>
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
