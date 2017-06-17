// Make a local redux server for demo purpose

import ActionTypes from './ActionTypes';

export function addUser(user) {
  return {
    type: ActionTypes.ADD_USER,
    user,
  };
}
