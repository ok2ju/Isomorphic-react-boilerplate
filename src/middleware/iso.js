import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import isDev from 'isdev';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '~/src/routes';
import * as reducers from '../reducers';
import promiseMiddleware from './promise';
import fetchComponentData from '../lib/fetchComponentData';

function handleRouter(res, props) {
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, applyMiddleware(promiseMiddleware));
  const initialState = store.getState();

  fetchComponentData(store.dispatch, props.components, props.params)
    .then(() => renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    ))
    .then(html => res
      .status(200)
      .render('index', {
        build: isDev ? null : '/build',
        root: html,
        state: JSON.stringify(initialState)
      }));
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search);
}

function handleNotFound(res) {
  res.status(404).send('Not Found');
}

function handleError(res, err) {
  res.status(500).send(err.message);
}

export function isoMiddleware(req, res) {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) handleError(res, err);
    else if (redirect) handleRedirect(res, redirect);
    else if (props) handleRouter(res, props);
    else handleNotFound(res);
  });
}

export default isoMiddleware;
