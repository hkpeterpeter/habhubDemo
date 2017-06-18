import { combineReducers } from 'redux';

// Minic server operations
import users from './users';
import client from './client';
import exerciseTemplates from './exerciseTemplates';
import exercises from './exercises';


export default combineReducers({
  client,
  users,
  exerciseTemplates,
  exercises,
});
