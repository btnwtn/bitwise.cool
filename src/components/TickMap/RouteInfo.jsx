import React from 'react'
import styled from 'react-emotion'

const LeadStyle = styled.span`
  margin-left: 0.5em;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.65rem;
  color: #787d7a;
`

const Rating = styled.small`
  margin-left: 0.4rem;
`

const Route = styled.div`
  margin-bottom: 1rem;
`
const Flex = styled.div`
  display: flex;
`

const Title = styled.h1`
  font-size: 1rem;
  margin: 0;
`

const RouteInfo = ({ url, name, location, rating, onsight, ...props }) => (
  <Route>
    <Flex>
      <Title>
        <a href={url}>{name}</a>
        <Rating>{rating}</Rating>
        {onsight && <LeadStyle>ONSIGHT</LeadStyle>}
      </Title>
    </Flex>
    <small>{location}</small>
  </Route>
)

export default RouteInfo
