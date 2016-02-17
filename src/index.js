import path from 'path'

import plugins from './plugins'
import styles from './styles'
import scripts from './scripts'
import images from './images'

function createWebpackConfig (config) {
  const {
    basePath,
    distDir,
    srcDir,
    isProduction,
    isDevelopment,
    vendor,
    mainModule,
    target,
    name,
    debug,
    hot,
    productionSourceMaps
  } = config

  const distPath = config.distPath = path.join(basePath, distDir)
  const srcPath = config.srcPath = path.join(basePath, srcDir)

  const hashType = isProduction ? 'chunkhash' : 'hash'

  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  let devtool = 'cheap-module-eval-source-map'

  if (isProduction && productionSourceMaps) {
    devtool = 'source-map'
  }

  const main = `./${srcDir}/${mainModule}`
  let entryApp = [main]

  if (isDevelopment && hot) {
    entryApp = [
      'webpack-hot-middleware/client',
      main
    ]
  }

  let webpackConfig = {
    debug,
    noInfo: true, // set to false to see a list of every file being bundled.
    devtool,
    target,
    name,
    entry: {
      app: entryApp,
      vendor: vendor
    },
    output: {
      filename: `[name].[${hashType}].js`,
      path: distPath,
      publicPath: ''
    },
    resolve: {
      root: srcPath,
      extensions: ['', '.js']
    },
    plugins: [],
    module: {
      loaders: [],
      preLoaders: []
    }
  }

  plugins(webpackConfig, config)
  styles(webpackConfig, config)
  scripts(webpackConfig, config)
  images(webpackConfig, config)

  return webpackConfig
}

module.exports = {
  createWebpackConfig
}
