var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: ['./src/app/app.ts', './src/styles/style.scss'],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/src'
    },
    devtool: "source-map",
    module : {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract
                ({
                  fallback: 'style-loader',
                  use: 'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
                }),
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'src/index.html'
        }
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
}