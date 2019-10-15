const { execute } = require('doc-scripts');
const path = require('path');
process.env.HOST = '0.0.0.0';

const getPath = relativePath => path.resolve(process.cwd(), path.resolve(__dirname, relativePath));

const options = {
  input: getPath('../docs')
};

execute('start', options);
