import { baseConfig } from './base';

/**
 * Prettier configuration for server projects.
 * @type {import("prettier").Config}
 */
export const serverConfig = {
  ...baseConfig,
  parser: 'typescript',
  plugins: ['prettier-plugin-decorator'],
};
