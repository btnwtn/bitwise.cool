import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import openGraphImage from '../images/default_open_graph.jpg'
import 'normalize.css'
import './layout.css'

let SEOBullshit = ({ title, description }) => {
  let platforms = ['twitter', 'og']
  let common = ['title', 'description', 'image']
  let map = {
    title,
    description,
    image: openGraphImage,
  }

  let makeMetaObject = value => {
    return platform => {
      if (!map[value]) {
        return
      }

      return { name: [platform, value].join(':'), content: map[value] }
    }
  }

  let social = common
    .reduce(
      (acc, value) => (acc.push(...platforms.map(makeMetaObject(value))), acc),
      []
    )
    .filter(Boolean)

  return [
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@bitwiselover' },
    { name: 'twitter:creator', content: '@bitwiselover' },
    ...social,
  ]
}

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
            ...SEOBullshit({ title, description }),
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
