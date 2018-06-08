const path = require('path')
const schema = require('./options.json')

const { getOptions, stringifyRequest } = require('@webpack-utilities/loader')
const { validateOptions } = require('@webpack-utilities/schema')

function loader() {}

function pitch (request) {
  const options = Object.assign(
    {},
    getOptions(this)
  )

  validateOptions(schema, options, 'Style Loader (Useable)')

  const hmr = [
    '// Hot Module Replacement',
    'if (module.hot) {',
    '  let lastRefs = module.hot.data && module.hot.data.refs || 0;',
    '',
    '  if (lastRefs) {',
    '    use();',
    '    // TODO revisit',
    '    if (!css) {',
    '      refs = lastRefs;',
    '    }',
    '  }',
    '  // TODO revisit',
    '  if (!css) {',
    '    module.hot.accept();',
    '  }',
    '',
    '  module.hot.dispose((data) => {',
    '    // TODO revisit',
    '    data.refs = css ? 0 : refs;',
    '',
    '    if (dispose) {',
    '      dispose();',
    '    }',
    '  });',
    '}',
  ].join('\n')

  return [
    '// Style Loader',
    '// Adds CSS to the DOM by lazy-loading them on demand',
    `import CSS from ${stringifyRequest(this, `!!${request}`)};`,
    `import runtime from ${stringifyRequest(this, `!${path.join(__dirname, 'lib/index.js')}`)};`,
    '',
    'let refs = 0;',
    'let dispose;',
    '',
    'let css = CSS',
    '',
    `if (typeof css === 'string') {`,
    `  css = [[module.id, css, '']];`,
    '}',
    '',
    `export * from ${stringifyRequest(this, `!!${request}`)};`,
    '',
    'export function use () {',
    '  if(!(refs++)) {',
    `    dispose = runtime(css, ${JSON.stringify(options)});`,
    '  }',
    '',
    '  return dispose;',
    '};',
    '',
    'export function unuse () {',
    '  if(refs > 0 && !(--refs)) {',
    '    dispose();',
    '',
    '    dispose = null;',
    '  }',
    '};',
    '',
    this.hot ? hmr : ''
  ].join('\n')
}

module.exports = loader
module.exports.pitch = pitch
