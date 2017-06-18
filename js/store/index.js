import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from '../reducers';

import users from '../data/users';
import exerciseTemplates from '../data/exerciseTemplates';
import exercises from '../data/exercises';

import { addUser } from '../actions/users';
import { addExerciseTemplate } from '../actions/exerciseTemplates';
import { addExercise } from '../actions/exercises';


const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)),
);

// Populate dataset
users.forEach(x => store.dispatch(addUser(x)));
exerciseTemplates.forEach(x => store.dispatch(addExerciseTemplate(x)));
exercises.forEach(x => store.dispatch(addExercise(x)));


export default store;
