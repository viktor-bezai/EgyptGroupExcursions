import globals from 'globals';
import pluginJs from '@eslint/js';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...Object.fromEntries(
          Object.entries({
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
          }).map(([key, value]) => [key.trim(), value])
        ),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Include JS recommended rules
      ...tseslint.configs.recommended.rules, // Include TypeScript recommended rules
      ...pluginReact.configs.recommended.rules, // Include React recommended rules
      '@typescript-eslint/no-explicit-any': 'off', // Will create 445 lint errors
      'react/react-in-jsx-scope': 'off', // Will create 669 lint errors
    },
  },
  {
    ignores: ['node_modules', '.next'],
  },
];
