import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            fontFamily: 'input mono condensed, hack, mono',
            fontSize: '1rem',
            lineHeight: 1,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav
        style={{
          marginLeft: 'auto',
          fontFamily: 'input mono condensed, hack, mono',
          fontSize: '.75rem',
        }}
      >
        <Link to="/about" style={{ marginRight: '1em' }}>
          About
        </Link>
        <Link to="/photos">Photos</Link>
      </nav>
    </div>
  </div>
)

export default Header
