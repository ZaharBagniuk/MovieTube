const localHost = 'http://localhost:3000/';
const query = 'Spy';

describe('Movies List', () => {
    it('Visits the dashboard and shows top-rated results', () => {
        cy.visit(localHost);
        cy.get('[data-testid="MoviesList"]').find('[data-testid="MovieCard"]').should('have.length', 20);
        cy.get('[data-testid="resultsHeader"]').should('have.text', 'Most Rated of All Time');
    });

    it('Selects movie from search bar', () => {
        cy.visit(localHost);
        cy.get('[data-testid="searchInputs"] [data-testid="input"]').type(query);
        cy.get('[data-testid="dataResult"]').find('[data-testid="dataItem"]').should('have.length', 20);
        cy.get('[data-testid="dataResult"] [data-testid="dataItem"]:first-child').click();
        cy.url().should('include', `${localHost}movie/`);
        cy.get('[data-testid="generalInfoContainer"] [data-testid="detailsSection"] [data-testid="Title"]').should('exist');
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
