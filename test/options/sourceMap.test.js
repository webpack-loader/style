const path = require('path')
const webpack = require('@webpack-utilities/test')

describe.skip('Options', () => {
  describe('sourceMap', () => {
    test('{Boolean}', async () => {
      const config = {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: path.resolve(__dirname, '../../src'),
                options: {
                  sourceMap: true
                }
              },
              {
                loader: '@webpack-loaders/css',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      }

      const stats = await webpack('fixture.js', config)
      let { source } = stats.toJson().modules[3]

      // TODO (michael-ciniawsky)
      // Add jest snapshot serializer for paths
      source = source.replace(process.cwd(), '')

      expect(source).toMatchSnapshot()
    })
  })
})
