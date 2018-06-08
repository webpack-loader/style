const path = require('path')
const { webpack, dom } = require('@webpack-utilities/test')

describe('E2E', () => {
  test('Style', async () => {
    const config = {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: path.resolve(__dirname, '../../src') },
            {
              loader: '@webpack-loaders/css',
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
    }

    const { window } = dom([ scripts.runtime, scripts.main ])

    const styles = window.document.head.innerHTML.trim()

    expect(styles).toMatchSnapshot()
  })
})
