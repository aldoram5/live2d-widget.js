const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nowDate = new Date();
const isProd = e => e === 'prod';

module.exports = env => {return{
  mode:isProd(env)? 'production': 'development',

  entry: [
    'core-js/fn/promise',
    './src/index.js',
  ],

  output: {
    filename: 'L2Dwidget.min.js',
    // YOU MUST INSTALL babel-plugin-syntax-dynamic-import FIRST TO ENABLE CODE SPLITTING!
    chunkFilename: 'L2Dwidget.[id].min.js',
    library: 'L2Dwidget',
    libraryExport: 'L2Dwidget',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'build'),
    pathinfo: (isProd(env) ? false : true),
  },

  target: 'web',

  devtool: 'source-map',

  watch: (isProd(env) ? false : true),

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify((isProd(env) ? 'production' : 'development')),
      },
    }),
    new UglifyJsPlugin({
      cache: false,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        // The L2D core library was droped too much,
        // so the warnings is useless recently.
        warnings: false,
        mangle: true,
        compress: {
          drop_console: false,
        },
      },
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    // Banner must be put below UglifyJsPlugin, or it won't work.
    new webpack.BannerPlugin(`${isProd(env) ? '' : '___DEV___'}https://github.com/aldoram5/live2d-widget.js built@${nowDate.toLocaleDateString()} ${nowDate.toLocaleTimeString()}`),
  ],

  resolve: {
    extensions: ['.js','.html', '.webpack.js', '.web.js', '.ts'],
    alias: {
      '@framework': path.resolve(__dirname, 'Framework/src')
    }
  },

  module: {

    rules: [
      {test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      },
    ]
  },
}}
