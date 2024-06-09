/**
 * @type {import('prettier').Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  singleQuote: true,
  endOfLine: 'crlf',
  printWidth: 80,
  trailingComma: 'none',
  plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-tailwindcss']
};

export default config;
