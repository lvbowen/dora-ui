module.exports = function(modules) {
  return {
    presets: [
      [
        '@babel/env',
        {
          modules: modules
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
          useESModules: modules !== 'commonjs'
        }
      ]
    ]
  };
};
