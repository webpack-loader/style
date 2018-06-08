const path = require('path')
const { webpack, dom } = require('@webpack-utilities/test')

describe('E2E', () => {
  test('URL', async () => {
    const config = {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: path.resolve(__dirname, '../../src/url') },
            {
              loader: '@webpack-loaders/url',
              options: {}
            }
          ]
        }
      ]
    }

    const stats = await webpack('fixture.js', config)
    const { assets } = stats.compilation

    const scripts = {
      main: assets['main.js'].source(),
      runtime: assets['runtime.js'].source()
    };

    const { window } = dom([ scripts.runtime, scripts.main ])

    const links = window.document.head.innerHTML.trim()

    expect(links).toMatchSnapshot()
  })
})
