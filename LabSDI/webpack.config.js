const path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'eval-cheap-module-source-map',
    cache: true,
    mode: 'development',
    output: {
        path: path.join(__dirname, "/src/main/resources/static/built"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};