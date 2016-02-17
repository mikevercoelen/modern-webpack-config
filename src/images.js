export default function (webpackConfig, {
  imagemin
}) {
  const svgSpriteSettings = {
    name: '[name].[hash]',
    prefixize: true
  }

  webpackConfig.module.loaders.push({
    test: /\.svg$/,
    loaders: [
      'svg-sprite?' + JSON.stringify(svgSpriteSettings),
      'img?minimize'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif)$/i,
    loaders: [
      'url?limit=8192',
      'img?minimize'
    ]
  })

  webpackConfig.imagemin = {
    gifsicle: {
      interlaced: false
    },
    jpegtran: {
      progressive: true,
      arithmetic: false
    },
    optipng: {
      optimizationLevel: 5
    },
    pngquant: {
      floyd: 0.5,
      speed: 2
    },
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false }
      ]
    },
    ...imagemin
  }
}
