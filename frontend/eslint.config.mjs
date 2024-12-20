import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Will create 445 lint errors
      'react/react-in-jsx-scope': 'off', // Will create 669 lint errors
    },
  },
  {
    ignores: ['node_modules', '.next'],
  },
]
