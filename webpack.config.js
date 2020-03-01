const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  hash: true,
});

const { ENVIRONMENT } = process.env;

function getPlugins() {
  const plugins = [
    HtmlWebpackPluginConfig,
    new MiniCssExtractPlugin('styles.css'),
    new webpack.ProvidePlugin({ jQuery: 'jquery' }),
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify(ENVIRONMENT),
      'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
    }),
  ];

  plugins.push(new webpack.SourceMapDevToolPlugin({}));
  return plugins;
}

module.exports = {
  entry: [ 'babel-polyfill', './src/index.js' ],
  output: {
    path: path.resolve('build'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  optimization: {
    nodeEnv: ENVIRONMENT,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [],
  },
  mode: ENVIRONMENT,
  resolve: {
    modules: [ path.join(__dirname, './src'), 'node_modules' ],
    extensions: [ '.js', '.jsx', '.css', '.scss' ],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        include: [ path.resolve(__dirname, 'src/') ],
        exclude: [ path.resolve(__dirname, 'node_modules/') ],
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [ path.resolve(__dirname, 'node_modules/') ],
        exclude: [ path.resolve(__dirname, 'src/') ],
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
  },
  plugins: getPlugins(),
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
