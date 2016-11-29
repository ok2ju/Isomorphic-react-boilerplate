import path from 'path';

const dir = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
};

const config = {
  entry: path.join(dir.src, 'client.jsx'),
  output: {
    path: dir.build,
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: dir.src,
    }],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
};

export default config;
