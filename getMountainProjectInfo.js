const _ = require('lodash')
const fs = require('fs')
const fetch = require('node-fetch')
const env = require('./env.json')

const getTicks = () =>
  fetch(
    `https://www.mountainproject.com/data/get-ticks?email=${
      env.MountainProject.email
    }&key=${env.MountainProject.key}`
  )
    .then(r => r.json())
    .then(({ ticks }) => ticks)
    .catch(() => [])

const formatRoutes = routes =>
  routes.reduce((acc, route) => ((acc[route.id] = route), acc), {})

const getRoutes = routeIds => {
  // MountainProject getRoutes API limits amount of routesIds to 100 per request
  const chunks = _.chunk(routeIds, 100)
  return Promise.all(
    chunks.map(routeIds =>
      fetch(
        `https://www.mountainproject.com/data/get-routes?routeIds=${routeIds.join(
          ','
        )}&key=${env.MountainProject.key}`
      )
        .then(r => r.json())
        .then(({ routes }) => routes)
        .catch(() => [])
    )
  )
    .then(_.flatten)
    .then(formatRoutes)
}

console.log('Fetching tick and route data from mountainproject.com')
getTicks()
  .then(ticks =>
    Promise.all([ticks, getRoutes(ticks.map(tick => tick.routeId))])
  )
  .then(([ticks, routes]) => {
    console.log('Writing -> data/ticks.json')
    fs.writeFileSync('./src/data/ticks.json', JSON.stringify(ticks, null, 2))
    console.log('Writing -> data/routes.json')
    fs.writeFileSync('./src/data/routes.json', JSON.stringify(routes, null, 2))
  })
  .then(() => {
    console.log('Successfully fetched data from mountainproject.com!')
  })
