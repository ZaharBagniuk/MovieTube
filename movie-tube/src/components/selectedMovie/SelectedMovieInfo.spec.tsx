import {mount} from '@cypress/react';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import store from "../../store";
import * as React from "react";
import SelectedMovieInfo from "./SelectedMovieInfo";

const sel = {
    selectedMovieInfo: '[data-testid="SelectedMovieInfo"]',
    title: '[data-testid="Title"]',
    releaseYear: '[data-testid="ReleaseYear"]',
    genres: '[data-testid="Genres"]',
    voteRate: '[data-testid="VoteRate"]',
    overview: '[data-testid="Overview"]'
};

const voteAverage = 8.4;
const releaseDate = '2022-04-29';
const selectedMovie = {
    id: 1,
    backdrop_path: '/test.jpg',
    poster_path: '/test.jpg',
    title: 'Test Movie',
    release_date: releaseDate,
    vote_average: voteAverage,
    overview: 'Lorem ipsum'
};

const genres = [
    {
        id: 1,
        name: 'Drama'
    },
    {
        id: 2,
        name: 'Comedy'
    }
];

describe('SelectedMovieInfo component test', () => {
    it('renders the selected movie info', () => {
        mount(
            <Provider store={store}>
                <BrowserRouter>
                    <SelectedMovieInfo selectedMovie={selectedMovie} movieGenres={genres} />
                </BrowserRouter>
            </Provider>
        );

        cy.get(sel.selectedMovieInfo).should('exist');
        cy.get(sel.title).should('have.text', selectedMovie.title);
        cy.get(sel.releaseYear).should('have.text', formatDate(new Date(selectedMovie.release_date)));
        cy.get(sel.voteRate).should('have.attr', 'title', calcRate(selectedMovie.vote_average));
        cy.get(sel.overview).should('have.text', selectedMovie.overview);
        cy.get(sel.genres).should('have.text', formattedGenres(genres));
    });
});

const formattedGenres = movieGenres => movieGenres.map(i => i.name).join(', ');

const calcRate = (rate: number) => {
    return Math.round(rate/2 * 10) / 10;
};

const formatDate = (date: Date) => {
  return date.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'});
};