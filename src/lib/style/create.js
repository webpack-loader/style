const attrs = require('../utils/attrs.js')
const insertStyle = require('./insert.js')
 
function createStyle (options, styles) {
  const style = document.createElement('style')

  options.attrs.type = 'text/css'

  attrs(style, options.attrs)
  insertStyle(options, style, styles)

  return style
}

module.exports = createStyle
