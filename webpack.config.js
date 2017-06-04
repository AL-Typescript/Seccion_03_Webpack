var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

var distFolder = 'dist';
var port = 8080;

module.exports = {
    entry: ['./src/app/app.ts', './src/styles/style.scss'],
    output: {
        filename: 'bundle.min.js',
        path: __dirname + '/' + distFolder
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?name=assets/img/[name].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        port: port,
        historyApiFallback: {
            index: 'src/index.html'
        }
    },
    plugins: [
        new ExtractTextPlugin('bundle.min.css'),
        new CopyWebpackPlugin([
            { from: 'src/index.html' },
            { from: 'src/favicon.ico' }
        ]),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            sourceMap: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new CleanWebpackPlugin(['dist', 'bin'], {
            root: '',
            verbose: true
        })
    ]
}