export default function (webpackConfig, {
  isDevelopment,
  preprocess
}) {
  webpackConfig.module.preLoaders.push({
    test: /\.js$/,
    loader: 'eslint',
    exclude: /node_modules/
  })

  webpackConfig.eslint = {
    configFile: '.eslintrc',
    emitWarning: isDevelopment
  }

  const babelSettings = {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0'],
    env: {
      development: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }]
        ]
      }
    }
  }

  webpackConfig.module.loaders.push({
    test: /\.js$/,
    loader: 'babel?' + JSON.stringify(babelSettings) +
            '!preprocess?' + JSON.stringify(preprocess),
    exclude: /node_modules/
  })

  webpackConfig.module.loaders.push({
    test: /\.json$/,
    loader: 'json'
  })
}
