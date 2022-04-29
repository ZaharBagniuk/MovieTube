import {mount} from '@cypress/react';
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import Dashboard from './Dashboard';
import store from "../store";
import * as React from "react";

const sel = {
    dashboard: '[data-testid="Dashboard"]',
    error: '[data-testid="Error"]',
    errorMsg: '[data-testid="Error-msg"]',
    moviesList: '[data-testid="MoviesList"]',
    selectedMovie: '[data-testid="SelectedMovie"]'
};

describe('Dashboard component test', () => {
    it('renders the dashboard', () => {
        mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </Provider>
        );
        cy.get(sel.dashboard).should('exist');
        cy.get(sel.error).should('not.exist');
    });

    it('dashboard show error', () => {
        const error = "Test error";
        const mockStore = configureStore();
        const mockedStore = mockStore(getStore({error: error}));
        cy.spy(mockedStore, 'dispatch');
        mount(
            <BrowserRouter>
                <Provider store={mockedStore}>
                    <Dashboard />
                </Provider>
            </BrowserRouter>
        );
        cy.get(sel.error).should('exist');
        cy.get(sel.errorMsg).should('have.text', error);
    });
});

const getStore = (params) => {
  return   {
      movies: {
          movies: {
              ...params
          }
      }
  }
};