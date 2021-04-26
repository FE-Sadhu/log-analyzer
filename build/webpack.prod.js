const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { name, version, author, repository, license } = require('../package.json');

module.exports = {
  mode: 'production', // 手动配置为 production 时，默认打包后 tree shaking 掉未引用的代码且压缩、混淆
  devtool: 'source-map',
  plugins: [
    // 声明版权
    new webpack.BannerPlugin({
      banner: () => {
        return (
          `${name} v${version}` +
          `\n` +
          `Author: ${author.name}` +
          `\n` +
          `Email: ${author.email}` +
          `\n` +
          `repository: ${repository.url}` +
          `\n` +
          `license: ${license}` +
          `\n` +
          `Date: ${new Date()}`
        );
      },
    }),
    // 分割 css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // 列在 entry 中，打包后输出的文件的名称。
      chunkFilename: 'css/[id].[contenthash].css', // 未列在 entry 中，却又需要被打包出来的文件的名称。 (如懒加载、代码分割的模块)
    }),
  ],
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
      `...`, // 压缩、混淆 的关键 terser-webpack-plugin
      new CssMinimizerPlugin(), // 压缩 css。  若想在开发环境也压缩，配置 optimization.minimize: true
    ],
  },
};
