const localHost = 'http://localhost:3000/';
const baseUrl = 'https://api.themoviedb.org/3';
const query = 'Spy';
const API_KEY = '251e8e9e47e44eddef1cf3e04d19caab';

describe('Movies List', () => {
    it('Visits the dashboard and shows top-rated results', () => {
        cy.visit(localHost);
        cy.get('[data-testid="MoviesList"]').find('[data-testid="MovieCard"]').should('have.length', 20);
        cy.get('[data-testid="resultsHeader"]').should('have.text', 'Most Rated of All Time');
    });

    it('Redirects back to the dashboard from selected movie', () => {
        cy.visit(localHost);
        cy.get('[data-testid="searchInputs"] [data-testid="input"]').type(query);
        cy.get('[data-testid="dataResult"] [data-testid="dataItem"]:first-child').click();
        cy.url().should('include', `${localHost}movie/`);
        cy.get('[data-testid="HomeBtn"]').click();
        cy.url().should('eq', localHost);
    });

    it('Searches for all movies that match to search query once user submits the search bar', () => {
        cy.visit(localHost);
        cy.get('[data-testid="searchInputs"] [data-testid="input"]').type(query);
        cy.get('[data-testid="SearchBar"] [data-testid="searchBarForm"]').submit();

        cy.url().should('eq', `${localHost}?query=${query}`);
        cy.get('[data-testid="MoviesList"]').find('[data-testid="MovieCard"]').should('have.length', 20);
        cy.get('[data-testid="resultsHeader"]').should('have.text', `Movies results for: ${query}`);

        cy.get('[data-testid="HomeBtn"]').click();
        cy.url().should('eq', localHost);
        cy.get('[data-testid="resultsHeader"]').should('have.text', 'Most Rated of All Time');
    });

    it('Shows Loader for movies list', () => {
        cy.intercept(
            'GET',
            `${baseUrl}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
            {
                fixture: 'movies'
            }
        ).as('topRatedMoviesSearch');
        cy.visit(localHost);
        cy.get('[data-testid="Loader"]').should('exist');
        cy.wait(1000);
        cy.wait('@topRatedMoviesSearch');
    });

    it('Allows to visit movies page by direct link', () => {
        cy.visit(`${localHost}?query=${query}`);
        cy.get('[data-testid="MoviesList"]').find('[data-testid="MovieCard"]').should('have.length', 20);
        cy.get('[data-testid="resultsHeader"]').should('have.text', `Movies results for: ${query}`);
    });

    it('Allows to visit specific movie page by direct link', () => {
        cy.visit(`${localHost}movie/2`);
        cy.get('[data-testid="generalInfoContainer"] [data-testid="detailsSection"] [data-testid="Title"]').should('exist');
    });
});
