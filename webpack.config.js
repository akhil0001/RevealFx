const path = require('path');

const commonConfiguration = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.ts'),
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts?$/, use: 'awesome-typescript-loader' }
        ]
    }
};

module.exports = [{
    ...commonConfiguration,
    output: {
        filename: 'index-cjs.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'commonjs',
    }
}, {
    ...commonConfiguration,
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd',
    }
}];