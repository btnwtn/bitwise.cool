import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import openGraphImage from '../images/default_open_graph.jpg'
import 'normalize.css'
import './layout.css'

const Layout = ({ title, description, keywords, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={
            title ? `${title} 🦆 bitwise.cool ` : data.site.siteMetadata.title
          }
          meta={[
            description && { name: 'description', content: description },
            keywords && { name: 'keywords', content: keywords.join(', ') },
            {
              name: 'og:image',
              content: openGraphImage,
            },
          ].filter(Boolean)}
        >
          <html lang="en" />
        </Helmet>
        {children}
      </>
    )}
  />
)

Layout.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.array,
  children: PropTypes.node.isRequired,
}

export default Layout
