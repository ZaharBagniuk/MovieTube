import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './store';
import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <Provider store={store}>
          <BrowserRouter>
              <Dashboard />
          </BrowserRouter>
      </Provider>
);
