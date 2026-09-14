import { type Config } from 'prettier';

const config: Config = {
  singleQuote: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: {
        singleQuote: false,
        proseWrap: 'always',
      },
    },
  ],
};

export default config;
