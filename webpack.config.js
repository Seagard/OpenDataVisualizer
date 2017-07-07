const webpack = require('webpack');

module.exports = {
    context: __dirname + '/client/js',
    entry: {
        app: './app.js',
    },
    output: {
        path: __dirname + '/client',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
            {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
};