module.exports = function(modules) {
  return {
    presets: [
      [
        '@babel/env',
        {
          modules: modules,
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4'
            ]
          }
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
