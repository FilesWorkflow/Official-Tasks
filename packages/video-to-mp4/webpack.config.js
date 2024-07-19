const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'task.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        library: {
            type: 'module'
        },
        module: true,
        // chunkFormat: 'module'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    experiments: {
        outputModule: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9001,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
};