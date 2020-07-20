module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "react/prop-types": 0,
    "import/no-cycle": 0,
  }
};