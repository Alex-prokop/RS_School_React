import typescriptEslintParser from '@typescript-eslint/parser';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: typescriptEslintParser,
    },
    plugins: {
      react: eslintPluginReact,
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginTypescript.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier,
];
