import 'bulma/bulma.sass'
import React from 'react';
import initializeReducer from './reducers'
import { render } from 'react-dom';
import App from './containers/App';

const $root = document.getElementById('root');

const initialize = () => {
  initializeReducer()
  render(<App />, $root);
}

window.onload = initialize;

if (module.hot) {
  module.hot.accept();
}
