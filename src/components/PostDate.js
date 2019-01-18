import React from 'react'
import styled from 'react-emotion'

let Date = styled.p`
  color: #483e3e;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.9em;
  margin-bottom: 2rem;
`

let PostDate = ({ children }) => <Date>{children}</Date>

export { PostDate }
