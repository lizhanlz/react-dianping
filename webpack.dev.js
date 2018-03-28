const path = require('path')
const root = __dirname
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  // 入口文件
  entry: [
      'react-hot-loader/patch', // 激活HMR
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      path.resolve(root, 'app/main.jsx')
  ],
  // 出口文件
  output: {
      filename: 'bundle.js',
     path: path.resolve(root, 'dist'),
     publicPath: '/'
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/},
      { test: /\.less$/, exclude: /node_modules/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader!postcss-loader' },
      { test:/\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000' },  // 限制大小5kb
      { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} // 限制大小小于5k
    ]
},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'app/template.html')
    }),
    new webpack.HotModuleReplacementPlugin(), // 热替换插件
    new webpack.NamedModulesPlugin() // 执行热替换时打印模块名字
],
  devServer: {
      proxy: {
        // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
        // koa 代码在 ./mock 目录中，启动命令为 npm run mock
        '/api': {
          target: 'http://localhost:3000',
          secure: false
        }
      },
      hot: true, // 激活服务器的HMR
      contentBase: path.resolve(root, 'dist'),
      publicPath: '/',
      port: 8080,
      historyApiFallback: true
  }
}
