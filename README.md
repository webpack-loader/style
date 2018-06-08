[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Style Loader</h1>
  <p>Adds CSS to the DOM by injecting a <code>&lt;style&gt;</code> tag</p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D @webpack-loaders/style
```

<h2 align="center"><a href="https://webpack.js.org/concepts/loaders">Usage</a></h2>

It's recommended to combine `style-loader` with the [`css-loader`](https://github.com/webpack-loaders/css)

**component.js**
```js
import style from './file.css'
```

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          '@webpack-loaders/style',
          '@webpack-loaders/css'
        ]
      }
    ]
  }
}
```

#### `Locals (CSS Modules)`

When using [local scoped CSS](https://github.com/webpack-loaders/css#scope) the module exports the generated identifiers (locals).

**component.js**
```js
import style from './file.css'

style.className === "z849f98ca812"
```

### `Url`

It's also possible to add a URL `<link href="path/to/file.css" rel="stylesheet">` instead of inlining the CSS `{String}` with `<style></style>` tag.

```js
import url from 'file.css'
```

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          '@webpack-loaders/style/url',
          '@webpack-loaders/url'
        ]
      }
    ]
  }
}
```

```html
<link rel="stylesheet" href="path/to/file.css">
```

### `Useable`

By convention the `Reference Counter API` should be bound to `.useable.css` and the `.css` should be loaded with basic `style-loader` usage.(similar to other file types, i.e. `.useable.less` and `.less`).

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          '@webpack-loaders/style',
          '@webpack-loaders/css'
        ]
      },
      {
        test: /\.useable\.css$/,
        use: [
          '@webpack-loaders/style/use',
          '@webpack-loaders/css'
        ]
      }
    ]
  }
}
```

#### `Reference Counter API`

**component.js**
```js
import style from './file.css'

style.use() // = style.ref()
style.unuse() // = style.unref()
```

Styles are not added on `import/require()`, but instead on call to `use`/`ref`. Styles are removed from page if `unuse`/`unref` is called exactly as often as `use`/`ref`.

:warning: Behavior is undefined when `unuse`/`unref` is called more often than `use`/`ref`. Don't do that.

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`attrs`](#attrs)**|`{Object}`|`{}`|Add custom attrs to `<style></style>`|
|**[`insertAt`]**](#insertat)|`{String\|Object}`|`bottom`|Inserts `<style></style>` at the given position|
|**[`insertInto`](#insertinto)**|`{String}`|`<head>`|Inserts `<style></style>` into the given position|
|**[`sourceMap`](#sourcemap)**|`{Boolean}`|`false`|Enable/Disable Sourcemaps|

### `attrs`

If defined, style-loader will attach given attributes with their values on `<style>` / `<link>` element.

**component.js**
```js
import style from './file.css'
```

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
      options: {
        attrs: {
          id: 'id'
        }
      }
    },
    { loader: 'css-loader' }
  ]
}
```

```html
<style id="id"></style>
```

#### `Url`

**component.js**
```js
import link from './file.css'
```

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: '@webpack-loaders/style/url',
      options: {
        attrs: {
          id: 'id'
        }
      }
    },
    '@webpack-loaders/url'
  ]
}
```

### `insertAt`

By default, the style-loader appends `<style>` elements to the end of the style target, which is the `<head>` tag of the page unless specified by `insertInto`. This will cause CSS created by the loader to take priority over CSS already present in the target. To insert style elements at the beginning of the target, set this query parameter to 'top', e.g

**webpack.config.js**
```js
{
  loader: '@webpack-loaders/style',
  options: {
    insertAt: 'top'
  }
}
```

A new `<style>` element can be inserted before a specific element by passing an object, e.g.

**webpack.config.js**
```js
{
  loader: '@webpack-loaders/style',
  options: {
    insertAt: {
      before: '#id'
    }
  }
}
```

### `insertInto`

By default, the style-loader inserts the `<style>` elements into the `<head>` tag of the page. If you want the tags to be inserted somewhere else you can specify a CSS selector for that element here. If you target an [IFrame](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement) make sure you have sufficient access rights, the styles will be injected into the content document head.
You can also insert the styles into a [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot), e.g

**webpack.config.js**
```js
{
  loader: '@webpack-loaders/style',
  options: {
    insertInto: '#host::shadow>#root'
  }
}
```

### `sourceMap`

Enable/Disable source maps

**webpack.config.js**
```js
{
  loader: '@webpack-loaders/style',
  options: {
    sourceMap: true
  }
}
```

<!-- <h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
  <tbody>
</table> -->


[npm]: https://img.shields.io/npm/v/@webpack-loaders/style.svg
[npm-url]: https://npmjs.com/package/@webpack-loaders/style

[node]: https://img.shields.io/node/v/@webpack-loaders/style.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-loader/style.svg
[deps-url]: https://david-dm.org/webpack-loader/style

[tests]: http://img.shields.io/travis/webpack-loader/style.svg
[tests-url]: https://travis-ci.org/webpack-loader/style

[cover]: https://codecov.io/gh/webpack-loader/style/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-loader/style

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
