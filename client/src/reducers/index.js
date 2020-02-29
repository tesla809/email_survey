// Used to import reducer's directory
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});



/*
Why named index.js?
import statements automatically give us 
any file called index.js
this is a convention in react/redux projects

Remember: Name of key in combineReducers
is what the piece of state will be called

authReducer will create state for the 
property auth.
*/
