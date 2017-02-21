const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

// http://browserl.ist/?q=last+3+versions%2C+not+ie+%3C+10
const browserSupport = [
  'last 2 versions',
  'not ie < 10'
]

// -------------------------------------------------------------
// Sass Loader.
// -------------------------------------------------------------

const sassLoader = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    use: [
      // CSS.
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },

      // Autoprefixer.
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            autoprefixer({browsers: browserSupport})
          ]
        }
      },

      // Sass.
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  })
}

// -------------------------------------------------------------
// Babel Loader.
// -------------------------------------------------------------

const babelLoader = {
  test: /\.js$/,
  exclude: [
    path.resolve(__dirname, 'node_modules')
  ],

  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        'es2015'
      ],
      plugins: [
        'transform-object-rest-spread'
      ]
    }
  }]
}

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

module.exports = (env = {}) => {
  return {
    entry: './src/index.js',

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public', 'static')
    },

    module: {
      rules: [
        sassLoader,
        babelLoader
      ]
    },

    plugins: [
      new ExtractTextPlugin('bundle.css')
    ],

    devtool: 'source-map'
  }
}
