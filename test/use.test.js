const path = require('path')
const webpack = require('@webpack-utilities/test')

describe('Loader', () => {
  test('Use', async () => {
    const config = {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: path.resolve(__dirname, '../src/use') },
            {
              loader: '@webpack-loaders/css',
              options: {}
            }
          ]
        }
      ]
    }

    const stats = await webpack('fixture.js', config)
    const { source } = stats.toJson().modules[3]

    expect(source).toMatchSnapshot()
  });
});
