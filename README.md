# WaffleCharm

View the live site at https://fiddlestats.com

## Install dependencies

Run `npm install`

## Development server

Run `RIOT_GAMES_API_KEY=RGAPI-123456789 npm run nx serve api` to start the API dev server exposed on http://localhost:3333/.

> You will need to provide your own `RIOT_GAMES_API_KEY` found here: https://developer.riotgames.com/#

In a seperate console, run `npm run nx serve crow-storm` to start the frontend dev server. Navigate to http://localhost:4200/.

The app or api will automatically reload if you change any of the source files.

## Build

Run `npm run nx build crowstorm` to build the project.

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run nx test crow-storm` to execute the unit tests via [Jest](https://jestjs.io).

Run `npm run nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `npm run nx e2e crow-storm-e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run nx affected:e2e` to execute the end-to-end tests affected by a change.

## Formatting code

Run `npm run nx format:write` to format the code.

## Understand the workspace

Run `npm run nx dep-graph` to see a diagram of the dependencies of your projects.

# Code scaffolding

## Generate an application

Run `npm run nx g @nrwl/react:app my-app` to generate an application.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `npm run nx g @nrwl/react:lib my-lib` to generate a new library.

Libraries are sharable across libraries and applications. They can be imported from `@waffle-charm/mylib`.

## Generate a component

Run `npm run nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Further help

Visit the [Nx Documentation](https://nx.dev/react) to learn more.

This project was generated using [Nx](https://nx.dev).

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/react)

[10-minute video showing all Nx features](https://nx.dev/react/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/react/tutorial/01-create-application)

## ☁ Nx Cloud

### Computation Memoization in the Cloud

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

# waffle-charm
