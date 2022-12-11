const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
}

const publicPath = path.join(__dirname, 'public');
module.exports = (env, argv) => {
    const isProduction = env === 'production';
    return {
        mode: isProduction ? 'production' : 'development',
        entry: ['./src/app.js'],
        output: {
            path: path.join(publicPath, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{ // run babel when a js file is encountered outside of node_modules/
                loader: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            }, {
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader?url=false',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                test: /\.s?css$/
            }]
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            }),
            ...isProduction ? [] : [new HtmlWebpackPlugin({ template: 'public/index.html' })]
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            static: {
                directory: publicPath
            },
            devMiddleware: {
                publicPath: '/dist/'
            },
            historyApiFallback: true,
            client: {
                logging: 'info',
                progress: true
            }
        }
    };
};