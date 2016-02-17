# Modern Webpack Config
This is a helper library for generating a webpack config for a modern asset pipeline.

## Installation

```
npm install modern-webpack-config --save
```

## Features

- [Babel](https://babeljs.io/) (es2015, react, stage-0)
- React support
- Hot reloading (also for React components)
- Pretty error messages in the browser (redbox-react)
- Define globals in your code
- Bundle split for vendor packages and your application stuff, to speed things up
- [Preprocessing](https://www.npmjs.com/package/preprocess)
- Uglify (minify, deadcode etc.)
- [SVG sprites](https://github.com/kisenka/svg-sprite-loader) (for icons etc.)
- [Images](https://www.npmjs.com/package/img-loader) with image minification etc. (supports .svg, .jpg, .jpeg, .gif, .png)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Sass](https://github.com/jtangelder/sass-loader)
- [Postcss](https://github.com/postcss/postcss)
- [Cssnano](http://cssnano.co/)

## Usage

```js
import path from 'path'
import { createWebpackConfig } from 'modern-webpack-config'

const ENV = process.env.NODE_ENV || 'development'

export const isDevelopment = (ENV === 'development')
export const isProduction = (ENV === 'production')
export const isTest = (ENV === 'test')

// Array of vendor libs, we create 2 separate bundles,
const vendor = [
  'react',
  'react-dom',
  'history',
  'react-router'
]

const webpackConfig = createWebpackConfig({
  isDevelopment,
  isProduction,
  isTest,
  vendor,
  hot: true, // enable if you want to use "webpack-hot-middleware"
  productionSourceMaps: false,
  basePath: path.resolve(__dirname, '../'),
  srcDir: 'src',
  distDir: 'dist',
  testsDir: 'tests',
  stylesDir: 'styles',
  mainModule: 'main.js',
  mainHtml: 'index.html',
  favicon: 'static/favicon.ico',
  target: 'web',
  name: 'client',
  debug: true,
  cssModules: true,
  preprocess: {}, // preprocess vars see https://www.npmjs.com/package/preprocess
  globals: {}, // global vars
  imagemin: {
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false },
        { removeUselessStrokeAndFill: true }
      ]
    }
  }
})
```
