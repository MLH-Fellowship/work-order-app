module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
  ],
  rules: {
    'react/prop-types': 0,
    'no-alert': 0,
    'no-console': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src/'],
        alias: {
          '@': './src/',
          '!': './',
          'theme': './src/native-base-theme/variables/commonColor'
        },
      },
    },
  },
  files: [
    {
      patterns: '**/*.png',
    },
  ],
};
