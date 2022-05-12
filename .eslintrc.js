module.exports = {
  // parser: "babel-eslint",
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-node'],
  extends: ['airbnb'],
  env: {
    // 这里填入你的项目用到的环境
    // 它们预定义了不同环境的全局变量，比如：
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
    // 这里填入你的项目需要的全局变量
    global: false,
    Promise: false,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
    // project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    /** Promise reject 必须添加 Error 对象 */
    'prefer-promise-reject-errors': [
      'error',
      {
        allowEmptyReject: false,
      },
    ],

    /** 必须使用 { } 包裹代码片段 */
    curly: 'error',

    quotes: [1, 'single'], // 引号类型 `` "" ''
    semi: [2, 'always'],

    /**
     * eslint 部分规则无法正确识别 ts
     * 需要使用 @typescript-eslint 下的同名规则
     */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',

    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-nested-ternary': 'warn',
    'no-return-assign': 'off',
    'no-void': 'off',
    'max-lines': [
      'error',
      {
        max: 512,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
  },
};
