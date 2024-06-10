import cspellRecommended from '@cspell/eslint-plugin/recommended';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import ts from 'typescript-eslint';

const __dirname = import.meta.dirname;
const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: js.configs.recommended, // optional unless using "eslint:recommended"
  allConfig: js.configs.all // optional unless using "eslint:all"
});

export default ts.config(
  {
    ignores: ['.vscode', 'coverage', 'dist', 'node_modules', 'vite.config.ts']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.jquery,
        ...globals.node
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    }
  },
  js.configs.recommended,
  cspellRecommended,
  prettierRecommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      ...ts.configs.strictTypeChecked,
      ...ts.configs.stylisticTypeChecked,
      ...compat.config(reactHooks.configs.recommended)
    ],
    plugins: {
      'react-refresh': reactRefresh
    },
    rules: {
      // React fixes
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // Preferences
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'forbid'
        },
        {
          selector: 'objectLiteralProperty',
          format: []
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase']
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase']
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        {
          selector: 'enumMember',
          format: ['PascalCase']
        }
      ]
    }
  }
);
