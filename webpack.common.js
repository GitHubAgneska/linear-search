

// eslint-disable-next-line no-undef
module.exports = {
    entry: './src/app.js', // or { main: "./src/index.js", vendor:"./src/vendor.js", ..  } for multiple entry points
    output: { assetModuleFilename: 'assets/[name].[hash][ext][query]' },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', //for compatibility accross browsers
                    options: {
                            presets: ['@babel/preset-env'],  // could be done in a separate file babel.config.js
                            plugins: [ '@babel/plugin-proposal-class-properties']
                        }
                    }
                },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|ttf|otf|eot|woff2)$/i,
                use: { 
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'fonts'
                    }
                }   
            }
        ]
    }
};