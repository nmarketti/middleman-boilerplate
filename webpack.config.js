// webpack.config.js
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        site: "./source/javascripts/site.js",
        vendor: [
                "jquery",
                "ScrollMagic",
                "debug.addIndicators",
                "animation.gsap",
                "TweenMax",
                "TweenLite",
                "TimelineMax",
                "mobile-detect"
            ]
    },
    output: {
        filename: "javascripts/[name].js", //Would like to use [name].[chunkhash]
        path: __dirname + '/.tmp/dist',
    },
    resolve: {
        alias: {
            "ScrollMagic": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic',
            "debug.addIndicators": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators',
            "animation.gsap": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
            "TweenMax": __dirname + '/node_modules/gsap/src/uncompressed/TweenMax',
            "TweenLite": __dirname + '/node_modules/gsap/src/uncompressed/TweenLite',
            "TimelineMax": __dirname + '/node_modules/gsap/src/uncompressed/TimelineMax',
            "ScrollToPlugin": __dirname + '/node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin',
        }
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "stylesheets/[name].css"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),

        new UglifyJSPlugin({
            compress: { warnings: false }
        }),

        //new BundleAnalyzerPlugin(),

        //new CompressionPlugin({})
    ]
}