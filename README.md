# Portfolio

The portfolio website for Nathan David McWilliams
([https://www.ndm.studio](https://www.ndm.studio)).

Happy to open this up as a reference. Feel free to use any of the React
components or Next.js code for your own website!

## Tech

Here's some of the tech used in this project:

- [React](https://react.dev/) - Frontend libray for the UI.
- [Next.js](https://nextjs.org) - React framework for Static Site Generation.
- [Typescript](https://www.typescriptlang.org) - For more maintainable code.
- [Normalize](https://necolas.github.io/normalize.css/) - Long live the king.
- [Jest](https://jestjs.io/) - For unit tests and React component tests.
- [Playwright](https://playwright.dev/) - For awesome cross-browser, end-to-end
  tests.

### Requirements

Requirements for building this project locally:

- Node ([NVM](https://github.com/nvm-sh/nvm) recommended).

If using NVM, you can run `nvm install` or `nvm use` in the project root
directory to switch to the recommended node version.

## Building and Running Locally

1. Get started with `npm install` in the project root directory.
2. Optionally create a `.env.local` file and specify local environment values
   for the keys in `.env.development`.
3. `npm run dev` to start the server.
4. Visit [localhost:3000](http://localhost:3000) in the browser.

### Running Tests

1. `npm test` for unit tests.
2. `npm run test:e2e` for playwright tests, after starting the local server.

## Updating Project Data

See [data/projects/README.md](data/projects/README.md).

## Resources

Some other recommended resources:

- I use [Visual Studio Code](https://code.visualstudio.com) for my code editor, with `editorconfig`, `prettier`, `eslint`, `stylelint`, `jest` and `playwright` extensions.

## License

All content, music and images copyright Nathan David McWilliams and respective
owners. See [License.txt](License.txt) for more info.
