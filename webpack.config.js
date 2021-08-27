const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = env => ({
    entry: {
        ui: './src/ui/index.tsx',
    },
    mode: env.production ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, './out/ui'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx'],
        alias: {
            common: path.resolve(__dirname, 'src/common'),
            ui: path.resolve(__dirname, 'src/ui'),
        },
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/ui'),
        hot: true,
        port: 9000,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    compress: {
                        inline: false,
                    },
                },
            }),
        ],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100192,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader'],
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Waypoint',
            template: require('html-webpack-template'),
            appMountId: 'root',
            inject: false,
            favicon: './icons/icon.png',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: env.production === true,
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
});
