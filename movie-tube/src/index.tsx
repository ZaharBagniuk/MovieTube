import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import MoviesHome from "./components/MoviesHome";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <Provider store={store}>
          <BrowserRouter>
              <MoviesHome />
          </BrowserRouter>
      </Provider>
);
