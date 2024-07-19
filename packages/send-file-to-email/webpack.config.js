// import Dotenv from 'dotenv-webpack';
// import path from 'path';

// export default (env, argv) => {

//     return {
//         entry: './src/index.ts',
//         module: {
//             rules: [{
//                 test: /\.ts$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/
//             }]
//         },
//         resolve: {
//             extensions: ['.ts', '.js']
//         },
//         output: {
//             filename: 'task.js',
//             path: path.resolve('dist'),
//             library: {
//                 type: 'module'
//             },
//             module: true,
//             chunkFormat: 'module'
//         },
//         experiments: {
//             outputModule: true
//         },
//         target: 'node20',
//         plugins: [
//             // new Dotenv({
//             //     path: './.env.local',
//             //     systemvars: true,
//             //     expand: true,
//             // }),
//             // new webpack.DefinePlugin({
//             //     'process.env.EMAIL_USER': JSON.stringify(process.env.EMAIL_USER),
//             //     'process.env.EMAIL_PASS': JSON.stringify(process.env.EMAIL_PASS),
//             //     'process.env.EMAIL_FROM': JSON.stringify(process.env.EMAIL_FROM),
//             //     'process.env.EMAIL_HOST': JSON.stringify(process.env.EMAIL_HOST),
//             //     'process.env.EMAIL_PORT': JSON.stringify(process.env.EMAIL_PORT),
//             // }),
//             new Dotenv({
//                 path: './.env.local',
//                 systemvars: false, // 不加载系统环境变量
//                 safe: true,
//                 allowEmptyValues: true,
//                 defaults: true,
//             }),
//         ],
//     };
// };

import Dotenv from 'dotenv-webpack';
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
        target: 'node20',
        plugins: [
            new Dotenv({
                path: './.env.local',
                systemvars: false, // 不加载系统环境变量
                safe: true,
                allowEmptyValues: true,
                defaults: true,
            }),
        ],
    };
};