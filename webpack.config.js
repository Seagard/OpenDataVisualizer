const path = require('path');

module.exports = {
  context: path.join(__dirname, '/client/js'),
  entry: {
    app: './app.js'
  },
  output: {
    path: path.join(__dirname, '/client'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '/client/js'),
        path.join(__dirname, '/client/test')
      ]
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};