const path = require('path')
const schema = require('./options.json')

const { getOptions, stringifyRequest } = require('@webpack-utilities/loader')
const { validateOptions } = require('@webpack-utilities/schema')

function loader () {}

function pitch (request) {
  const options = Object.assign(
    {},
    getOptions(this)
  )

  validateOptions(schema, options, 'Style Loader (URL)')

  const hmr = [
    '// Hot Module Replacement',
    'if (module.hot) {',
    `  module.hot.accept(${stringifyRequest(this, `!!${request}`)}, () => {`,
    `    link(require(${stringifyRequest(this, `!!${request}`)}));`,
    '  });',
    '',
    '  module.hot.dispose(() => link());',
    '}',
  ].join('\n')

  return [
    '// Style Loader',
    '// Adds CSS to the DOM by adding a <link> tag',
    `import link from ${stringifyRequest(this, `!${path.join(__dirname, 'lib/url/index.js')}`)};`,
    `import href from ${stringifyRequest(this, `!!${request}`)};`,
    '',
    `link(href, ${JSON.stringify(options)});`,
    '',
    this.hot ? hmr : '',
  ].join('\n')
}

module.exports = loader
module.exports.pitch = pitch