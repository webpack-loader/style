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

  validateOptions(schema, options, 'Style Loader')

  const hmr = [
    '// Hot Module Replacement',
    'if (module.hot) {',
    '  // When the styles change, update the <style> tags',
    `  module.hot.accept(${stringifyRequest(this, `!!${request}`)}, () => {`,
    '    // TODO update to ESM',
    `    let hot = require(${stringifyRequest(this, `!!${request}`)});`,
    '',
    '    if (typeof hot === "string") {',
    '      hot = [[module.id, hot, ""]];',
    '    }',
    '',
    '    style(hot);',
    '  });',
    '',
    '  // When the module is disposed, remove the <style> tags',
    '  module.hot.dispose(() => style());',
    '}',
  ].join('\n')

  return [
    '// Style Loader',
    '// Adds CSS to the DOM by adding a <style> tag',
    `import CSS from ${stringifyRequest(this, `!!${request}`)};`,
    `import style from ${stringifyRequest(this, `!${path.join(__dirname, 'lib/index.js')}`)};`,
    '// CSS Exports',
    `export * from ${stringifyRequest(this, `!!${request}`)};`,
    '// CSS',
    'let css = CSS',
    '',
    '// Convert CSS',
    'if (typeof css === "string") {',
    '  css = [[ module.id, css, "" ]];',
    '}',
    '',
    '// Loader Options',
    `const options = ${JSON.stringify(options)}`,
    '',
    '// Add Styles (DOM)',
    'const styles = style(css, options);',
    '',
    this.hot ? hmr : '',
  ].join('\n')
}

module.exports = loader
module.exports.pitch = pitch
