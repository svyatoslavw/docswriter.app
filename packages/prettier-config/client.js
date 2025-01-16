import { baseConfig } from './base';

/**
 * Prettier configuration for React and Next.js projects.
 * @type {import("prettier").Config}
 */
export const clientConfig = {
  ...baseConfig,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^./src/(.*)$',
    '^../(.*)',
    '^./(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
};
