const path = require('path');

module.exports = {
  dest: '/site',
  base: '/dora-ui/',
  title: 'Dora UI',
  hashRouter: true,
  codeSandbox: false,
  themeConfig: {
    showPlaygroundEditor: true
  },
  typescript: true,
  notUseSpecifiers: true,
  filterComponents: files =>
    files.filter(filepath => /components\/.*\/*\.(js|jsx|ts|tsx)$/.test(filepath)),
  modifyBundlerConfig: config => {
    config.resolve.alias.components = path.resolve(__dirname, './components');
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    });
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
