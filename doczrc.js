export default {
  dest: '/site',
  base: '/dora-ui',
  title: 'Dora UI',
  codeSandbox: false,
  typescript: true,
  modifyBundlerConfig: config => {
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
