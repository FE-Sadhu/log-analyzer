const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');
const productionConfig = require('./webpack.prod');
const developmentConfig = require('./webpack.dev');

module.exports = (env) => {
  const { development, production, analyze } = env;
  if (development) return merge(commonConfig, developmentConfig);
  if (production) return merge(commonConfig, productionConfig);
  productionConfig.plugins.push(new BundleAnalyzerPlugin()); // 会开一个 server 代理 bundle 分析页面
  if (analyze) return merge(commonConfig, productionConfig);
  throw new Error('No matching configuration was found!');
};
