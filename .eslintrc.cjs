module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  rules: {
    camelcase: "warn",
    eqeqeq: "warn",
    "no-var": "error",
    "func-names": "warn",
    curly: "warn",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021,
    allowImportExportEverywhere: true,
    requireConfigFile: false,
  },
  env: {
    es6: true,
    node: true,
  },
};
