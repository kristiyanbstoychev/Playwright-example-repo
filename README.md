# Playwright-example-repo

The tests are based on the Cypress Real World App - https://github.com/cypress-io/cypress-realworld-app
before running the app run - yarn install
to run the app - yarn dev

npm init playwright@latest

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:
    npx playwright test
