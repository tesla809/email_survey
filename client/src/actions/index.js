// action creators modifies state in store
import axios from 'axios';  // make api requests
import { FETCH_USER } from './types';

const fetchUsers = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')  // dispatch AFTER api request has completed
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  }
};

/*
Redux thunk 
allows you to call dispatch after you do things,
not immediately.

Redux thunk is a middleware included in index.js
It looks for function that is returned form 
an action creator.

If there is one, it runs it before calling
dispatch. 
*/