export default {
  dest: '/site',
  base: '/dora-ui',
  title: 'dora',
  codeSandbox: false,
  typescript: true,
  modifyBundlerConfig: config => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    });
    return config;
  }
};
