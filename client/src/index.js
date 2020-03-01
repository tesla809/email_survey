// data layer control (Redux)
import 'materialize-css/dist/css/materialize.min.css';  // import css file at root level. Use CSS since easier to customize for now vs JS in CSS.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // manages react redux integeration. Provider reads/passes store to App and all its components
import { createStore, applyMiddleware } from 'redux'; 
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';  // will import index.js




const store = createStore(  // create new instance of redux store
  reducers,                 // reducers to pass into state
  {},                       // initial state of app, populate if you want server side rendering
  applyMiddleware(          // add redux-thunk here
    reduxThunk
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);