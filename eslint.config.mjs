import { FlatCompat } from '@eslint/eslintrc';
import cspellRecommended from '@cspell/eslint-plugin/recommended';
import globals from 'globals';
import imports from 'eslint-plugin-import';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
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
    files: ['**/*.mjs'],
    rules: {
      'sort-imports': 'error'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      // Manually add "src/" directory to import plugin's "internal" group
      'import/internal-regex': '^src/'
    },
    extends: [
      ...ts.configs.strictTypeChecked,
      ...ts.configs.stylisticTypeChecked,
      ...compat.config(imports.configs.recommended),
      ...compat.config(imports.configs.typescript),
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

      // Tailwind fixes
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',

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
          selector: 'import',
          format: ['camelCase', 'PascalCase']
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase']
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        {
          selector: 'enumMember',
          format: ['PascalCase']
        }
      ],
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: [
            // Global
            ['builtin', 'external'],

            // Project
            ['internal', 'parent', 'sibling', 'index'],

            // Misc.
            'type',
            'object',
            'unknown'
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
);
