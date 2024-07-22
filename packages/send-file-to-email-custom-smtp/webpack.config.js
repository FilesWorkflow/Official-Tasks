import path from 'path';

export default (env, argv) => {

    return {
        entry: './src/index.ts',
        module: {
            rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: 'task.js',
            path: path.resolve('dist'),
            library: {
                type: 'module'
            },
            module: true,
            chunkFormat: 'module'
        },
        experiments: {
            outputModule: true
        },
        target: 'node20'
    };
};