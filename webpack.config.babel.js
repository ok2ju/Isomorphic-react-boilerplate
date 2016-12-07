import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import isDev from 'isdev';
import { dir } from './src/config';

const TARGET = process.env.npm_lifecycle_event;

let config = {
  entry: [
    'babel-polyfill',
    path.join(dir.src, 'client.jsx'),
  ],
  output: {
    path: path.join(dir.public, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    root: dir.src,
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: dir.src,
    }],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

if (TARGET === 'build:prod' && !isDev) {
  config = merge(config, {
    bail: true,
    devtool: 'source-map',
    output: {
      publicPath: '/build/',
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        dropDebugger: true,
        dropConsole: true,
        compressor: {
          warnings: false,
        },
      }),
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }],
    },
  });
}

if (TARGET === 'server:prod' && !isDev) {
  config = merge(config, {
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }],
    },
  });
}

if (TARGET === 'server:dev' && isDev) {
  config = merge(config, {
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client'],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre'],
        },
      }],
    },
  });
}

export default config;
