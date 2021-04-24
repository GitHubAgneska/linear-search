const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    // stop minifying main.js
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // use this template to generate dist/html and inside include script "main.[contenthash].js"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                // exclude: [/\.main.scss$/, /node_modules/],  // necessary ?
                use: [
                    'style-loader', // 3 - inject <style> in DOM (≠ prod where separate bundle css file with mini-css-extract-plugin)
                    { loader: 'css-loader', options: { url:true } },  // 2 - css => js ///  url true: Enable/disable url() resolving.
                    { loader: 'postcss-loader',  // 1B - no options (base)
                        options: { postcssOptions: { plugins: function () {  return [ require('autoprefixer') ]; }} }},// 1B - + options (Bootstrap)
                    'sass-loader'   // 1 - scss => css
                ]
            }
        ]
    },
    devtool: 'source-map', // makes bundled main.js more readable in browser devtools to debug, using source code and not transpiled code
    devServer: {
        contentBase: './dist',
        hot: true // hot reloading : live dom changes when touching scss -- could also be used as 'serve --hot' flag
    }
});