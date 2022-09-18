module.exports = {
  env: {
    es2021: true,
    browser: true,
    jest: true,
    "react-native/react-native": true,
  },
  extends: ["plugin:react/recommended", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "react-native", "@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  rules: {
    "react-native/no-unused-styles": 2,
    "require-jsdoc": 0,
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksConditionals: false,
        checksVoidReturn: false,
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
        checksSpreads: false,
      },
    ],
    "@typescript-eslint/no-var-requires": 0,
    // "linebreak-style": 0,
    // indent: ["error", 2],
    // quotes: [2, "double", { avoidEscape: true }],
    // "object-curly-spacing": ["error", "always"],
  },
};
