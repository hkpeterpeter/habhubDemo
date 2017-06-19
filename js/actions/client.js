import ActionTypes from './ActionTypes';

export function setUserID(id) {
  return {
    type: ActionTypes.SET_USER_ID,
    id,
  };
}

export function setExerciseID(id) {
  return {
    type: ActionTypes.SET_EXERCISE_ID,
    id,
  };
}
