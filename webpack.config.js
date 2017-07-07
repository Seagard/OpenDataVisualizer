const webpack = require('webpack');

module.exports = {
    context: __dirname + '/public/js',
    entry: {
        app: './main.js',
        // vendor: ['angular']
    },
    output: {
        path: __dirname + '/public',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
};