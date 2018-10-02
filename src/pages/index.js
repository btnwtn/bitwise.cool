import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'react-emotion'

const GalleryPreview = styled.div`
  position: relative;
`

const Image = styled.img`
  display: block;
  margin: 0;
`

const TitlePositioner = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
`

const Title = styled.h1`
  color: white;
  text-shadow: 2px 1px 5px rgba(0, 0, 0, 0.7);
  font-size: 1rem;
  margin: 0;
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
      {galleryIndexFiles.map(({ node }) => {
        const { slug } = node.fields
        const { title, featuredImage } = node.frontmatter
        const pictureProps = featuredImage
          ? featuredImage.childImageSharp.fluid
          : { src: 'https://i.imgur.com/rbXZcVH.jpg' }

        return (
          <Link to={slug} key={node.id}>
            <GalleryPreview>
              <Image {...pictureProps} alt={title} />
              <TitlePositioner>
                <Title>{title}</Title>
              </TitlePositioner>
            </GalleryPreview>
          </Link>
        )
      })}

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
