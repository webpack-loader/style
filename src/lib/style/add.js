const applyStyle = require('./apply.js')
const createStyle = require('./create.js')
const removeStyle = require('./remove.js')

const styles = []

function addStyle(obj, options) {
  let style, update, remove, result

  style = createStyle(options, styles)

  update = applyStyle.bind(null, style)

  remove = function () {
    removeStyle(style, styles)
  }
 
  update(obj)

  return function updateStyle (newObj) {
    if (newObj) {
      if (
        newObj.css === obj.css &&
        newObj.media === obj.media &&
        newObj.sourceMap === obj.sourceMap
      ) {
        return
      }

      update(obj = newObj)
    } else {
      remove()
    }
  }
}

module.exports = addStyle
