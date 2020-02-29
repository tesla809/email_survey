// data layer control (Redux)
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // manages react redux integeration. Provider reads/passes store to App and all its components
import { createStore, applyMiddleware } from 'redux'; 

import App from './components/App';
import reducers from './reducers';  // will import index.js

const store = createStore(  // create new instance of redux store
  reducers,                 // reducers to pass into state
  {},                       // initial state of app, populate if you want server side rendering
  applyMiddleware()         // add redux-thunk here
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);