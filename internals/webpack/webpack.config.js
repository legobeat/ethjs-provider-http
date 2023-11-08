const webpack = require('webpack'); // eslint-disable-line
const path = require('path');   // eslint-disable-line

var env = process.env.NODE_ENV;   // eslint-disable-line
var filename = 'ethjs-provider-http';      // eslint-disable-line
var library = 'HttpProvider';          // eslint-disable-line
var config = {                    // eslint-disable-line
  entry: [
    path.resolve('./lib/index.js'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(path.join(__dirname, '../../dist')),
    filename: filename + '.js',       // eslint-disable-line
    library: library,                 // eslint-disable-line
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '/* eslint-disable */', raw: true, entryOnly: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.output.filename = filename + '.min.js'; // eslint-disable-line
  config.plugins
  .push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
      screw_ie8: false,
    },
    mangle: {
      screw_ie8: false,
    },
    output: {
      screw_ie8: false,
    },
  }));
}

module.exports = config;
