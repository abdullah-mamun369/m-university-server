import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

// module.exports = [
//   // Any other config imports go at the top
//   eslintPluginPrettierRecommended,
// ];

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  {
    ignores: ['.node_modules/*', '.dist/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
