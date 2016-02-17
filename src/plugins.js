import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default function (webpackConfig, {
  srcPath,
  mainHtml,
  favicon,
  isProduction,
  isDevelopment,
  isTest,
  globals
}) {
  // html
  webpackConfig.plugins.push(
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, mainHtml),
      hash: false,
      favicon: path.resolve(srcPath, favicon),
      filename: mainHtml,
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  )

  if (isDevelopment) {
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    )
  } else if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    )
  }

  if (!isTest) {
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }))
  }
}
