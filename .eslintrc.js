module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    'vue/setup-compiler-macros': true,
    jest: true
  },

  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false
    },
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': ['error']
  }
}
