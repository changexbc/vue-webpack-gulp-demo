var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var vue = require('vue-loader')

module.exports = {
    entry: {
        app: ['./src/main.js']
    },
    output: {
        path: path.join(__dirname, 'static'),
        publicPath: '/static/',
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel?optional[]=runtime&loose=all'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=1000'
        }]
    },
    vue: {
        autoprefixer: true,
        autoprefixer: {
            // browsers: ['last 2 versions']
        }
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            zepto: path.join(__dirname, 'src/libs/zepto/zepto.js'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true,
            '__TEST__': false,
            '__PROD__': false,
        }),
        new webpack.ProvidePlugin({
            "$": "zepto",
            "Zepto": "zepto",
            "window.Zepto": "zepto",
            "_": "underscore",
            "FastClick": "fastclick",
            "Daze":path.join(__dirname,'src/libs_native/native')
        })
    ]

}


// if (process.env.NODE_ENV === 'test') {
//     writeTime()
//     module.exports.plugins = [
//         new webpack.ProvidePlugin({
//             "$": "npm-zepto",
//             "Zepto": "npm-zepto",
//             "window.Zepto": "npm-zepto",
//             "_": "underscore",
//             "FastClick": "fastclick"
//         }),
//         new webpack.DefinePlugin({
//             '__DEV__': false,
//             '__TEST__': true,
//             '__PROD__': false,
//         })
//     ]
//     module.exports.devtool = 'inline-source-map'
// }

// else if (process.env.NODE_ENV === 'production') {
//     writeTime()
//     module.exports.plugins = [
//         new webpack.ProvidePlugin({
//             "$": "npm-zepto",
//             "Zepto": "npm-zepto",
//             "window.Zepto": "npm-zepto",
//             "_": "underscore",
//             "FastClick": "fastclick"
//         }),
//         new webpack.DefinePlugin({
//             '__DEV__': false,
//             '__TEST__': false,
//             '__PROD__': true,
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.optimize.OccurenceOrderPlugin()
//     ]
// }

// else {
//     module.exports.devtool = 'inline-source-map'
// }
