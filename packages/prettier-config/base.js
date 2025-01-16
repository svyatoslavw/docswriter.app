/**
 * Base Prettier configuration for the monorepo.
 * @type {import("prettier").Config}
 */

export const baseConfig = {
  printWidth: 100,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: 'none',
  semi: false,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  arrowParens: 'always',
};
