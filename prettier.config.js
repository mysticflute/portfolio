module.exports = {
  singleQuote: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: {
        proseWrap: 'always',
      },
    },
  ],
};
