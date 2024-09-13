# Portfolio

The portfolio website for Nathan David McWilliams
([https://www.ndm.studio](https://www.ndm.studio)).

Happy to open this up as a reference! Feel free to use any of the React
components or Next.js code for your own website.

## Tech

Here are some of the tools and frameworks used in this project:

- [React](https://react.dev/) - Frontend library for the UI.
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
   for any of the keys in `.env`.
3. `npm run dev` to start the server.
4. Visit [localhost:3000](http://localhost:3000) in the browser.

### Setting Environment Variables

Creating an `.env.local` file is optional, but it allows customizing some behaviors of the app and enabling certain third-party integrations.

To get started, create a new file named `.env.local` at the root of the project directory. This file is part of `.gitignore` so it won't be checked in.

#### Logging

You can override the `PINO_LOG_LEVEL` to get more or less verbose application logs.

#### ConvertKit

Without an `env.local` file, you'll see an error message about `NEXT_PUBLIC_NEWSLETTER_FORM_ID` not being set. This is ok, but it means trying to sign up for the newsletter will always throw an error.

To set this value, go to the ConvertKit website and grab the id of a form for testing:

1. In the site menu, go to "Landing Page & Forms".
2. Click the name of the form to use for testing (or create a new one).
3. Click "Publish".
4. Select the "HTML" tab, and find the 7-digit id within the `action` attribute of the `form` element. For example, in `<form action="https://app.convertkit.com/forms/1234567/subscriptions ..."`, the id is `1234567`.

Use this id to set the value for `NEXT_PUBLIC_NEWSLETTER_FORM_ID` in the `.env.local` file.

#### Others

Look at any of the other keys in the `.env` file, and override them in `.env.local` as necessary.

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
rights-holders. See [License.md](LICENSE.md) for more info.
