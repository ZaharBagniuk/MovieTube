# Getting Started with Movie Tube App
MovieTube is a fast movies search platform that provides a user with the functionality to
search through the [The Movie DB](https://www.themoviedb.org/) service database. 

While visiting dashboard page(w/o any parameters in the URL), a user can see a list of top-rated movies.

The cards with movies are interactive on mouse over, so a user can just hover over the specific 
movie-card and see its overview.

If a user is interested in particular movie then by clicking on
movie-card the corresponding movie page is opened. There he can look at the `poster`, `average rating`,
`movie genres`, `release date` and `overview`.

To search for specific movie a user can type a specific movie title and
then either submit the search form with all results that match the search term or
select desired movie from the search-bar results. When a user types in a search term,
then a list of movies that match the search criteria is shown. Each of these items has
a poster icon, title, average rating and overview to make a user choice and life easier.

On every user-step it's possible to search for another movie/movies using the search bar or
return to the main page top-rated movies by clicking on `Home` button.

## Pre-config

In the project directory, you need to run below commands:

1. ### `npm install`
2. ### `npm start`

This runs the app in the development mode.
The app can be accessed via:

[http://localhost:3000](http://localhost:3000)

The page will reload when you make changes.

## Run UI component tests
### `npm run test-ui`
Launches [Cypress component testing](https://docs.cypress.io/guides/component-testing/introduction).

## Run End-2-End tests
### `npm run test-e2e`
Launches [Cypress E2E testing](https://www.cypress.io/).

## Used core dependencies
* [Typescript](https://www.typescriptlang.org/)
* [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview)
* [Cypress](https://www.cypress.io/)
* [Redux](https://redux.js.org/)
* [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
* [Axios](https://github.com/axios/axios)
* [Styled-components](https://styled-components.com/)
* [Material UI](https://mui.com/)

## API documentation
* [The Movie DB](https://developers.themoviedb.org/3)

