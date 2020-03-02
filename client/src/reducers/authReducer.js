import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {  // null is not signed in by default
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;  // user model or false (not signed in, payload is empty string). Empty string is falsy value.
    default:
      return state
  }
};