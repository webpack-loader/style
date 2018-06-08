const attrs = require('../utils/attrs.js')
const insertStyle = require('../style/insert.js')

function createLink(options) {
  const link = document.createElement('link')

  options.attrs.type = 'text/css'
  options.attrs.rel = 'stylesheet'

  attrs(link, options.attrs)
  insertStyle(options, link)

  return link
}

module.exports = createLink
