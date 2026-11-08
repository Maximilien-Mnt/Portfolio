module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    React: "readonly",
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: { version: "18.3" },
  },
  ignorePatterns: ["node_modules/", ".next/", "out/", "src/content/schema.ts", "src/content/hero.ts"],
};