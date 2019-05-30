const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const modifyBundlerConfig = (config, dev) => {
  const styleLoaders = ['css-loader'];
  styleLoaders.unshift(dev ? 'style-loader' : MiniCssExtractPlugin.loader);
  return webpackMerge(config, {
    resolve: {
      alias: {
        components: path.resolve(__dirname, './components') // 配置alias
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: styleLoaders
        },
        { test: /\.less$/, use: [...styleLoaders, 'less-loader'] }
      ]
    },
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
      dev
        ? () => {}
        : new MiniCssExtractPlugin({
            filename: '[name].css'
          })
    ]
  });
};

module.exports = {
  base: '/dora-ui/', // public path
  title: 'Dora UI', // 网站名称
  codeSandbox: false, // 是否开启codeSandbox
  htmlContext: {
    // 引入html一些内容
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://codemirror.net/theme/material.css'
        }
      ]
    }
  },
  themeConfig: {
    // 主题配置
    showPlaygroundEditor: true, // 展示Playground编辑器
    codemirrorTheme: 'material' // 代码主题
  },
  typescript: true, // 支持typescript组件
  propsParser: false, // 是否解析组件props用于官方Props组件展示
  notUseSpecifiers: true,
  filterComponents: files =>
    files.filter(filepath => /components\/.*\/*\.(js|jsx|ts|tsx)$/.test(filepath)),
  modifyBundlerConfig,
  menu: [
    'Introduction', // auto ordered menu "Introduction"
    'Quick Start',
    'Changelog',
    {
      name: 'Components' // manually oredered menu "Components"
    }
  ]
};
