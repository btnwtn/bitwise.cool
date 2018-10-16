import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import 'normalize.css'
import './layout.css'

const Layout = ({ description, keywords, children }) => (
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
          title={data.site.siteMetadata.title}
          meta={[
            description && { name: 'description', content: description },
            keywords && { name: 'keywords', content: keywords.join(', ') },
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
