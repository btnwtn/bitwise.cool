import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'react-emotion'

function oleFishyYates(array) {
  let a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let x = a[i]
    a[i] = a[j]
    a[j] = x
  }

  return a
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const GalleryPreview = styled.div`
  position: relative;
`

const Image = styled.img`
  display: block;
  margin: 0;
  width: 100%;
`

const Title = styled.h1`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
  text-shadow: 2px 1px 5px rgba(0, 0, 0, 0.7);
  font-size: 1rem;
  margin: 0;
  max-width: 80%;
`

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  const galleryIndexFiles = posts.filter(({ node }) => {
    if (node.fields.collection !== 'content') {
      return false
    }

    let paths = node.fileAbsolutePath.split('/')
    return paths[paths.length - 1] === 'index.md'
  })

  return (
    <Layout>
      <h1>Random Galleries</h1>
      <Grid>
        {galleryIndexFiles.slice(0, 5).map(({ node }) => {
          const { slug } = node.fields
          const { title, featuredImage } = node.frontmatter
          const pictureProps = featuredImage
            ? featuredImage.childImageSharp.fluid
            : { src: 'https://i.imgur.com/rbXZcVH.jpg' }

          return (
            <GalleryPreview>
              <Link
                to={slug}
                key={node.id}
                style={{ display: 'block', position: 'relative' }}
              >
                <Image {...pictureProps} alt={title} />
                <Title>{title}</Title>
              </Link>
            </GalleryPreview>
          )
        })}
      </Grid>

      <br />
      <br />
      <br />

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
          fileAbsolutePath
          fields {
            slug
            collection
          }
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 420) {
                  src
                  srcSet
                  srcSetWebp
                }
              }
            }
          }
          excerpt(pruneLength: 80)
        }
      }
    }
  }
`

export default IndexPage
