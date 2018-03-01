const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const Mock = require('webpack-dev-server-simple-mock')


const SRC_DIR = "src";
const DIST_DIR = "dist";
const MOCK_API_JSON_FILE = './mock/api.json'

const FONTS_DIR = `static/fonts`
const IMGS_DIR = `static/imgs`
const JS_DIR = 'static/js'
const CSS_DIR = 'static/css'

const DEBUG = process.env.NODE_ENV === "development";
const hash = DEBUG ? "" : '[chunkhash:8]';

//给css3添加私用前缀 -webkit-, -moz-等
const autoprefixer = {
    loader: 'postcss-loader',
    options: {  //没有options 会导致报错No PostCSS Config found
        plugins: (loader) => [
            require('autoprefixer')()
        ]
    }
}

//development和production的公共插件
const plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        inject: true //bundle文件放在body中
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ["react", "vendor"],
        minChunks: Infinity
    }),
    new ExtractTextPlugin({
        filename: `${CSS_DIR}/[name].${hash}.css`,
        allChunks: true
    }),
]

if(!DEBUG) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
        new webpack.HashedModuleIdsPlugin()
    )
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

const config = {
    entry: {
        vendor: ['axios', 'babel-polyfill'],
        react: ['react', 'react-dom', 'react-router'],
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        filename: `${JS_DIR}/[name].${hash}.js`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: plugins,
    devServer: {
        //供外部服务器访问
        host : '0.0.0.0',
        // 提供模块热替换功能(HMR) 但需要web插件(HotModuleReplacementPlugin)开启HMR功能
        hot: true,
        port: 8080,
        publicPath: '/',
        contentBase: [path.resolve(__dirname, path.dirname(MOCK_API_JSON_FILE))],
        proxy: {
            '/**': {
                bypass: Mock(MOCK_API_JSON_FILE)
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_module/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', autoprefixer]
                  })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader', autoprefixer]
                  })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', autoprefixer]
                  })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: `url-loader?name=${IMGS_DIR}/[name].[ext]`,
                    }
                ]
            }
        ]
    }
}

module.exports = config
