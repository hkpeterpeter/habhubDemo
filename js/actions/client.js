import ActionTypes from './ActionTypes';

export function setUserID(id) {
  return {
    type: ActionTypes.SET_USER_ID,
    id,
  };
}
