const nodeExternals = require('webpack-node-externals');
const path = require('path');
const glob = require('glob');

module.exports = {
  entry: glob.sync('./src/!(*.test).js').reduce((entries, entry) =>
    Object.assign(entries, {
      [entry.replace('.js', '')]: entry,
    }), {}),
  externals: [nodeExternals({
    modulesDir: './node_modules',
  })],
  target: 'node',
  devtool: 'inline-source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, '/src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
