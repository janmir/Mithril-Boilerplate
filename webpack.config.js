const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'app.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            /*exclude: [
                /node_modules/,
                'src/configs/configs/your.json'
            ]*/
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }],
    }
}