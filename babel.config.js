module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
        },
        corejs: '2',
        useBuiltIns: 'usage',
      }],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    ['@babel/plugin-proposal-object-rest-spread'],
  ],
};
