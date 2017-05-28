module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/src'
    },
    module : {
        rules: [
            {
                loader: 'ts-loader',
                exclude: /node_modules/
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
    }
}