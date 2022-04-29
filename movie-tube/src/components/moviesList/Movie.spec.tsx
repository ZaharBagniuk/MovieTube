import * as React from "react";
import {mount} from "@cypress/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import Movie from "./Movie";
import store from "../../store";

const sel = {
    movieCardFront: '[data-testid="MovieCardFront"]',
    movieCardBack: '[data-testid="MovieCardBack"]',
    frontCardContentTitle: '[data-testid="MovieCardFront"] .CardContent div',
    frontCardContentVoteRate: '[data-testid="MovieCardFront"] .CardContent .secondaryText .voteRate .value',
    frontCardContentYear: '[data-testid="MovieCardFront"] .CardContent .releaseDate',
    backCardTitle: '[data-testid="MovieCardBack"] .overviewContent .title',
    backCardContent: '[data-testid="MovieCardBack"] .overviewContent .content'
};

const IMG_SRC_ROOT = 'https://image.tmdb.org/t/p/w200';

const movie = {
    adult: false,
    backdrop_path: "/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg",
    genre_ids: [35, 18, 10749],
    id: 19404,
    original_language: "hi",
    original_title: "test",
    overview: "Raj is a rich, carefree, happy-go-lucky ",
    popularity: 27.506,
    poster_path: "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    release_date: "1995-10-20",
    title: "Dilwale Dulhania Le Jayenge",
    video: false,
    vote_average: 8.7,
    vote_count: 3596
};

describe('Movie component test', () => {
    it('renders front part of the movie card', () => {
        mount(
            <BrowserRouter>
                <Provider store={store}>
                    <Movie movie={movie} />
                </Provider>
            </BrowserRouter>
        );

        cy.get(`${sel.movieCardFront} img`).should('have.attr', 'src', `${IMG_SRC_ROOT}${movie.poster_path}`);
        cy.get(sel.movieCardFront).should('exist');
        cy.get(sel.frontCardContentTitle).should('have.text', movie.title);
        cy.get(sel.frontCardContentYear).should('have.text', new Date(movie.release_date).getFullYear());
        cy.get(sel.frontCardContentVoteRate).should('have.text', movie.vote_average);
    });

    it('renders back part of the movie card', () => {
        mount(
            <BrowserRouter>
                <Provider store={store}>
                    <Movie movie={movie} />
                </Provider>
            </BrowserRouter>
        );

        cy.get('.c011').trigger('mouseover', {force: true});
        cy.get(sel.movieCardBack).should('exist');
        cy.get(sel.backCardTitle).should('have.text', 'Overview');
        cy.get(sel.backCardContent).should('have.text', movie.overview);
    });
});
