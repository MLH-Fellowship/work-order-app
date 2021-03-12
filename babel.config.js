module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './src',
          extensions: ['.js', '.jsx', '.png'],
          alias: {
            '@': './src',
            '!': './',
            'theme': './src/native-base-theme/variables/commonColor'
          },
        },
      ],
    ],
  };
};
