const _ = require('lodash')
const fs = require('fs')
const fetch = require('node-fetch')
const env = require('./env.json')

let fetchedRoutes = {}
try {
  fetchedRoutes = require('./data/routes.json')
} catch (e) {}

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
  const alreadyFetched = Object.keys(fetchedRoutes)
  // MountainProject getRoutes API limits amount of routesIds to 100 per request
  const chunks = _.chunk(
    routeIds.filter(id => alreadyFetched.includes(id)),
    100
  )
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

getTicks()
  .then(ticks =>
    Promise.all([ticks, getRoutes(ticks.map(tick => tick.routeId))])
  )
  .then(([ticks, routes]) => {
    fs.writeFileSync('./data/ticks.json', JSON.stringify(ticks, null, 2))
    fs.writeFileSync('./data/routes.json', JSON.stringify(routes, null, 2))
  })
