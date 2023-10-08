module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },

  env: {
    browser: true,

    es2021: true,
  },

  extends: [
    "standard-with-typescript",

    "plugin:react/recommended",

    "plugin:prettier/recommended",
  ],

  overrides: [
    {
      env: {
        node: true,
      },

      files: [".eslintrc.{js,cjs}"],

      parserOptions: {
        sourceType: "script",
      },
    },
  ],

  parserOptions: {
    ecmaVersion: "latest",

    sourceType: "module",

    project: "./tsconfig.eslint.json",
  },

  plugins: ["react", "prettier"],

  rules: {
    "prettier/prettier": "error",

    "react/react-in-jsx-scope": "off",

    "linebreak-style": ["error", "unix"],
  },

  ignorePatterns: ["node_modules", "Server"],
};
