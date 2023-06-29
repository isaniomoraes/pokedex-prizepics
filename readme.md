# Pokedex - PrizePicks
> Quick project made by [@isaniomoraes](https://github.com/isaniomoraes)

## Project setup

```bash
yarn install
yarn dev
```

## End to End (E2E) Testing

This project uses [Cypress](https://www.cypress.io/) for E2E testing.
You can start by running `npx cypress open` to setup your environment and run the E2E tests.

More useful commands:

```bash
yarn lint
yarn test:e2e
yarn test:e2e:headless
```

#### Preview of cypress running on UI mode:
![Cypress running on UI mode](/screenshots/screenshot-cypress-ui.png "Cypress running on PrizePics Pokedex")

#### Preview of cypress running on headless mode:
![Cypress running on headless mode](/screenshots/screenshot-cypress-headless.png "Cypress running on PrizePics Pokedex")

## Pokemon API wrapper

This project uses [Pokenode-ts](pokenode-ts) package, it is one of the Pokemon API library wrappers recommended at [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2).

It also provides official typings for the API.
Same result could be achieved using [axios](https://github.com/axios/axios) and [axios-cache-interceptor](https://github.com/arthurfiorette/axios-cache-interceptor).


## Improvements / nice-to-have

- [ ] Improve pokemon sprites table/components `src/components/SpritesTable/index.tsx`
- [ ] Refactor pokemon moves component and display the rest of the moves data
- [ ] Add more E2E/unit tests
- [ ] Integrate tests with Github Actions
- [ ] Better data formatting for Height and Weight
- [x] Display a "Not found" error message
- [ ] Enable Redux logger (on development env only)
- [ ] Implement details router (/details/:pokemonName) for better navigation history
- [ ] Option to clean history search
- [ ] Migrate search history from localStorage to IndexedDB or a real API