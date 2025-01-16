const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const eslintConfigPrettier = require("eslint-config-prettier");
const tseslint = require("typescript-eslint");
const pluginPrettier = require("eslint-plugin-prettier");
const globals = require("globals");

module.exports = [
  eslintConfigPrettier,
   eslintConfigPrettier,
  {
    plugins: {
      "@typescript-eslint/eslint-plugin": typescriptEslintPlugin,
      "prettier": pluginPrettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    ignores: [".eslintrc.js"], // Здесь указываются файлы для игнорирования
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // Prettier integration
      "prettier/prettier": "error",
    },
  },
  // Add plugin @typescript-eslint/recommended manually
  {
    plugins: {
      "@typescript-eslint/eslint-plugin": typescriptEslintPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  // Add plugin prettier/recommended manually
  {
    plugins: {
      "prettier": pluginPrettier,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules,
    },
  },
];
