import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from '../reducers';

import users from '../data/users';
import { addUser } from '../actions/users';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)),
);

users.forEach(user => store.dispatch(addUser(user)));


export default store;
