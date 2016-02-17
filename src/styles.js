import path from 'path'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default function (webpackConfig, {
  srcPath,
  stylesDir,
  cssModules,
  isDevelopment
}) {
  const cssLoader = !cssModules
    ? 'css?sourceMap'
    : [
      'css?modules',
      'sourceMap',
      'importLoaders=1',
      'localIdentName=[name]__[local]___[hash:base64:5]'
    ].join('&')

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    include: /src/,
    loaders: [
      'style',
      cssLoader,
      'postcss',
      'sass?sourceMap'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    include: /src/,
    loaders: [
      'style',
      cssLoader,
      'postcss'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    exclude: /src/,
    loaders: [
      'style',
      'css?sourceMap',
      'postcss',
      'sass?sourceMap'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: /src/,
    loaders: [
      'style',
      'css?sourceMap',
      'postcss'
    ]
  })

  webpackConfig.sassLoader = {
    includePaths: path.resolve(srcPath, stylesDir)
  }

  webpackConfig.postcss = [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      safe: true,
      sourcemap: true
    })
  ]

  if (!isDevelopment) {
    // TODO: What does this do?
    webpackConfig.module.loaders.filter((loader) =>
      loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
    ).forEach((loader) => {
      const [first, ...rest] = loader.loaders
      loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
      delete loader.loaders
    })

    webpackConfig.plugins.push(
      new ExtractTextPlugin('[name].[contenthash].css', {
        allChunks: true
      })
    )
  }
}
