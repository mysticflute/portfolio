module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'media-feature-range-notation': null,
    'no-descending-specificity': null,
    'selector-max-id': 0,
    'selector-class-pattern': [
      '^([a-z][a-zA-Z0-9]*)$',
      {
        message: selector =>
          `Expected class selector "${selector}" to be camelCase`,
      },
    ],
  },
};
