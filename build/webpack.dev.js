const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map', // 映射到原始代码中的具体行。就是 init 时比较慢、rebuild 时快
  devServer: {
    contentBase: './dist', // 将 dist 目录下的文件 serve 到 localhost:8080 下
    open: true, // 打包完成后自动打开浏览器，访问本地服务器
    hot: true, // 开启模块热更新，也就是当仅是某个模块的代码改变时，不用刷新整个页面（否则会刷新），只改变模块相关渲染
    hotOnly: false, // true -> 控制当模块热更新失败时，不刷新整个页面
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
  optimization: {
    //注意：如 import css 文件。 你直接 Import，没有使用导出，但是有副作用。如果不在 package.json 的 sideEffects 字段中加入，会被 tree-shaking 掉
    usedExports: true, // 开发环境下为没有引用到的、且没有副作用的代码打上标记，意味着生产环境时这些代码会被 tree-shaking
  },
};
