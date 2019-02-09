module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6,
    project: "./tsconfig.json",
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  }
};
