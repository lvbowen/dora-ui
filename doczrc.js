const path = require('path');
const { css } = require('docz-plugin-css');

module.exports = {
  dest: '/site', // build文件存放目录
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
  plugins: [
    css({
      // css处理
      preprocessor: 'less'
    })
  ],
  typescript: true, // 支持typescript组件
  propsParser: false, // 是否解析组件props用于官方Props组件展示
  notUseSpecifiers: true,
  filterComponents: files =>
    files.filter(filepath => /components\/.*\/*\.(js|jsx|ts|tsx)$/.test(filepath)),
  modifyBundlerConfig: config => {
    // 自定义webpack配置
    config.resolve.alias.components = path.resolve(__dirname, './components'); // 配置alias
    return config;
  },
  menu: [
    'Introduction', // auto ordered menu "Introduction"
    'Quick Start',
    'Changelog',
    {
      name: 'Components' // manually oredered menu "Components"
    }
  ]
};
