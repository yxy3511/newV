var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';
var isTest = ENV === 'test'
/*
extract-text-webpack-plugin插件，
有了它就可以将你的样式提取到单独的css文件里，
妈妈再也不用担心样式会被打包到js文件里了。
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 *将公共模块提取，生成名为`commons`的chunk
 */
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//压缩
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

   /*// split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })*/

//判断开发模式
var debug = process.env.NODE_ENV !== 'production';

var getEntry = function(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);   //文件目录
        extname = path.extname(entry);   //后缀名
        basename = path.basename(entry, extname);  //文件名
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[basename] = ['./' + entry]; //这是在osx系统下这样写  win7  entries[basename]
    }
    return entries;
}

//入口(通过getEntry方法得到所有的页面入口文件)
var entries = getEntry('/src/common/lib/**/*.js', '/src/common/lib/');
//提取哪些模块共有的部分从entries里面获得文件名称
var chunks = Object.keys(entries);
//模板页面(通过getEntry方法得到所有的模板页面)
var pages = Object.keys(getEntry('/src/common/css/**/*.css', '/src/common/css/'));
var port = '8080'
var config = {
    entry:isTest ? {} : {
        app: './src/index.js',
        //login: ['./src/login/login.index.js']
    },
    output: {
        path: path.join(__dirname, '/build'),//输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: isProd ? '/' : 'http://localhost:' + port + '/',               //模板、样式、脚本、图片等资源对应的server上的路径
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',         //每个页面对应的主js的生成配置
        // filename: '[name].js',           //每个页面对应的主js的生成配置
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'   //chunk生成的配置
    },
    devServer: {
        // historyApiFallback: true,
        // contentBase: "./",
        // quiet: false, //控制台中不输出打包的信息
        // noInfo: false,
        // hot: false, //开启热点
        // inline: true, //开启页面自动刷新
        // lazy: false, //不启动懒加载
        // progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: port, //设置端口号
        proxy: {
            '/api/*': {
                //target: 'http://front.dev.rmos.com/',
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                secure: false
            }
        }

    } ,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [ //加载器
            /*{
                test: /\.js$/,
                 enforce: "pre",
                 loader: "eslint-loader"
            },*/
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query:{
                   presets:['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader'
                loader: ExtractTextPlugin.extract('style-loader','css-loader')
            }, {
                test: /\.less$/,
                // loader: 'css-loader!less-loader'
                loader: ExtractTextPlugin.extract('css-loader','less-loader')
            }, /*{
                test: /\.html$/,
                loader: "html?-minimize"    //避免压缩html,https://github.com/webpack/html-loader/issues/50
            },*/ 
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }, {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8192&name=imgs/[name]-[hash].[ext]'
            },//解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader','sass-loader') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
                // loader: 'css-loader!sass-loader'
            },
            {
                test: /\.jade/,
                loader: 'jade-loader'
            },
            {
                include: /\.(pug)/,
                // pass options to pug as a query ('pug-html-loader?pretty')
                loaders: ['html-loader', 'html-loader?exports=false']
            },
            /*{

                include: /\.(pug|jade)/,
                // pass options to pug as a query ('pug-html-loader?pretty')
                loaders: ['html-loader', 'pug-html-loader?exports=false']
            }*/
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/favicon.ico',
            template: './src/index.jade',
            //js: ['app'],
            inject: 'body'
        }),
        new webpack.ProvidePlugin({ //加载jq
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        /*new CommonsChunkPlugin({
            name: 'commons', // 将公共模块提取，生成名为`commons`的chunk
            chunks: chunks,
            filename:'[name].bundle.js',
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),*/

        new ExtractTextPlugin('[name].[hash].css', {disable: !isProd}), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new UglifyJsPlugin({    //压缩代码
           compress: {
               warnings: false
           },
           except: ['$super', '$', 'exports', 'require']    //排除关键字
        })
    ]
};

/*
pages.forEach(function(pathname) {
    var conf = {
        filename: './build/' + pathname + '.jade', //生成的html存放路径，相对于path
        // filename: '../../views/' + pathname + '.html', //生成的html存放路径，相对于path
        template: './src/index.jade', //html模板路径
        inject: false,  //js插入的位置，true/'head'/'body'/false
    };
    if (pathname in config.entry) {
        favicon: 'public/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        conf.inject = 'body';
        conf.chunks = ['commons', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});*/

module.exports = config;   