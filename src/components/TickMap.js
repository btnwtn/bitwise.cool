import React, { Component } from 'react'
import _ from 'lodash'

import ticks from '../data/ticks.json'
import routes from '../data/routes.json'

export default class TickMap extends Component {
  render() {
    return (
      <div>
        {Object.entries(_.groupBy(ticks, 'date'))
          .slice(0, 5)
          .map(([date, ticks]) => {
            return (
              <div key={date}>
                <p style={{ fontSize: '.8rem', marginBottom: '1em' }}>{date}</p>
                <ul>
                  {ticks.map(tick => {
                    const route = routes[tick.routeId]
                    return (
                      <div key={tick.id} style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex' }}>
                          <h1
                            style={{
                              fontSize: '1rem',
                              margin: 0,
                            }}
                          >
                            <a href={route.url}>{route.name} </a>
                            <small
                              style={{
                                marginLeft: '.1777rem',
                                textDecoration: 'none',
                              }}
                            >
                              {route.rating}
                            </small>
                            {tick.leadStyle.toUpperCase() === 'ONSIGHT' && (
                              <span
                                style={{
                                  marginLeft: '.5em',
                                  textTransform: 'uppercase',
                                  fontWeight: 'bold',
                                  fontSize: '.65rem',
                                  color: '#787d7a',
                                }}
                              >
                                {tick.leadStyle}
                              </span>
                            )}
                          </h1>
                        </div>
                        <small>{route.location.slice(0, 2).join(', ')}</small>
                      </div>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </div>
    )
  }
}
