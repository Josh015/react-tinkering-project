/**
 * @type {import('prettier').Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  singleQuote: true,
  endOfLine: 'crlf',
  printWidth: 80,
  trailingComma: 'none',
  htmlWhitespaceSensitivity: 'ignore',
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^[.]',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^[./]',
    '^(src)(/.*)$'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-jsdoc']
};

export default config;
