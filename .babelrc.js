const outputModule = process.env.OUTPUT_MODULE;

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: outputModule || false
      }
    ],
    '@babel/typescript',
    '@babel/react'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: outputModule !== 'commonjs'
      }
    ]
  ]
};
