const path = require('path');

const publicPath = path.join(__dirname, 'public');

module.exports = {
    entry: './src/playground/redux-expensify.js',
    output: {
        path: publicPath,
        filename: 'bundle.js'
    },
    module: {
        rules: [{ // run babel when a js file is encountered outside of node_modules/
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
            test: /\.s?css$/
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: publicPath,
        historyApiFallback: true
    }
};