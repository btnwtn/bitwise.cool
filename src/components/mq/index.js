const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
}

const mq = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = `@media(min-width: ${breakpoints[label]}px)`
  return acc
}, {})

export default mq
