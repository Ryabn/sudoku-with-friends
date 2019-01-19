module.exports = {
    entry: './script.js',
    output: {
        filename: '../../docs/scripts.bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
};