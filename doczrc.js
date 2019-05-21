export default {
  title: 'Docz Typescript',
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
