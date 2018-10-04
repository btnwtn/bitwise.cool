import _ from 'lodash'
import React from 'react'
import styled, { css } from 'react-emotion'

import ticks from '../data/ticks.json'
import routes from '../data/routes.json'

import RouteInfo from './TickMap/RouteInfo'

const Date = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  margin-bottom: 1em;
  position: relative;
  text-shadow: 0 1px 0 #fff;

  &:after {
    position: absolute;
    bottom: 0.3em;
    left: 0;
    content: '';
    width: 100%;
    height: 0.4em;
    background-color: #e1eeff;
    z-index: -1;
  }
`

const TickMap = () => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
      grid-row-gap: 1rem;
    `}
  >
    {Object.entries(_.groupBy(ticks, 'date'))
      .slice(0, 5)
      .map(([date, ticks]) => {
        return (
          <div key={date}>
            <Date>{date}</Date>
            <ul>
              {ticks.map(tick => {
                const route = routes[tick.routeId]
                return (
                  <RouteInfo
                    key={tick.id}
                    url={route.url}
                    name={route.name}
                    rating={route.rating}
                    location={route.location.slice(0, 2).join(', ')}
                    onsight={tick.leadStyle.toLowerCase() === 'onsight'}
                  />
                )
              })}
            </ul>
          </div>
        )
      })}
  </div>
)

export default TickMap
