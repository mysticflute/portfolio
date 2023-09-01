module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: false,
          removeViewBox: false,
        },
      },
    },
    'convertStyleToAttrs',
    'removeDimensions',
  ],
};
