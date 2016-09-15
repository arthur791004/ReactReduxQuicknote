var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var vendors = [
  'react',
  //'react-chrome-redux',
  'react-dom',
  'react-redux',
  'react-router',
  'react-tap-event-plugin',
  'redux',
  'redux-form',
  'redux-logger',
  'redux-thunk',
  'material-ui',
  'superagent',
  'keymirror',
  'bluebird',
];
var plugins = [
  new CleanPlugin('build'),
  new ExtractPlugin('[name].css', { allChunks: true }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html'),
    filename: 'index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (process.env.PROD) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false,
        dead_code: true,
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    })
  );
}

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/index.js'),
    //background: path.resolve(__dirname, 'app/background/index.js'),
    //content: path.resolve(__dirname, 'app/content/index.js'),
    vendor: vendors,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.(jpg|git|png)$/,
        loader: 'url?limit=8192&name=images/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=8192&name=images/[name].[ext]'
      },
      {
        test:  /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=8192&minetype=application/font-woff2&name=images/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: plugins,
  devtool: '',
  devServer: {
    contentBase: 'build',
    host: '0.0.0.0',
  },
};
