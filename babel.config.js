module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@App': './src',
            '@my-types': './src/types.d.ts',
            '@models': './src/models',
            '@utils': './src/utils',
            '@schemas': './src/schemas',
            '@config': './src/config',
            '@controllers': './src/controllers',
            '@routes': './src/routes'
          }
        }
      ]
    ],
    ignore: ['**/*.spec.ts', '**/*.test.ts']
  };