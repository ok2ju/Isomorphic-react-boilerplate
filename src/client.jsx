import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import * as reducers from './reducers';
import promiseMiddleware from './middleware/promise';

/* eslint no-underscore-dangle: ["error", { "allow": ["__INITIAL_STATE__"] }] */
const initialState = window.__INITIAL_STATE__;

const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(promiseMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root'),
);
