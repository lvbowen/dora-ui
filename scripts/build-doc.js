const { execute } = require('doc-scripts');
const path = require('path');

const getPath = relativePath => path.resolve(process.cwd(), path.resolve(__dirname, relativePath));

const options = {
  input: getPath('../docs'),
  output: getPath('../site')
};

const webpackConfig = {
  devtool: false
};

execute('build', options, webpackConfig);
