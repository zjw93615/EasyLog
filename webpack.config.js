const path = require('path');
const distDir = path.join(process.cwd(), "dist");

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: distDir,
        filename: "[name].min.js",
        // 采用通用模块定义
        libraryTarget: "umd",
        library: 'easy-log-report'
    },
};