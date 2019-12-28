const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = require(`./config/${process.env.NODE_ENV}.env`)
const publicPath = env.BASE_URL.replace(/\"/g, "");
const HOST = '192.168.60.32'
const path = require('path');

function resolvePath(dir) {
  return path.join(__dirname, '..', dir);
}
const assetsPath = function(_path) {
  const assetsSubDirectory = "static";
  return path.posix.join(assetsSubDirectory, _path);
};

module.exports = {
  mode: 'production',
  entry: [
    './src/app.js'
  ],
  output: {
    publicPath: publicPath,
    filename: assetsPath("js/[name].js"),
    chunkFilename: assetsPath("js/[name].js"),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolvePath('src'),
      '@p': resolvePath('src/pages'),
      '@c': resolvePath('src/components'),
      '@m': resolvePath('src/module')
    }
  },
  devServer: {
    hot: true,
    open: true,
    compress: true,
    contentBase: '/dist/',
    host: HOST,
    watchOptions: {
      poll: true
    },
    proxy: {
      "/": {
        target: 'http://m.v1.com', // 域名 // https://user.lvguang.club  http://m.v2.com
        ws: false, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          "^/": "/"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          resolvePath('src'),
          resolvePath('node_modules/framework7'),
          resolvePath('node_modules/framework7-vue'),
          resolvePath('node_modules/template7'),
          resolvePath('node_modules/vant'),
          resolvePath('node_modules/dom7'),
          resolvePath('node_modules/ssr-window')
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolvePath('src/icons')],
        options: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },{
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolvePath('src/icons')],
        options: {
          symbolId: "icon-[name]"
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](md5|template7|dom7|vue|vue-router|vuex|lodash|core-js|core-js-pure|@babel\/runtime|axios|js-cookie|qs|framework7|framework7-icons|framework7-vue)[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor.${moduleFileName}`;
          },
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    },
    minimizer: [new UglifyJsPlugin({parallel:true})]
  },
  plugins: [
    new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "bundle-report.html",
          openAnalyzer: false
        }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: { inline: false }
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        removeCommentsFromCDATA: true
      },
      hash: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath("css/[name].css"),
      chunkFilename: assetsPath("/css/[name].css")
    }),
    new CopyWebpackPlugin([{
      from: resolvePath('static'),
      to: resolvePath('/dist/static'),
    }]),
  ]
}