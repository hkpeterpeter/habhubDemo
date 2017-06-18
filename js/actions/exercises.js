import ActionTypes from './ActionTypes';

export function addExercise(exercise) {
  return {
    type: ActionTypes.ADD_EXERCISE,
    exercise,
  };
}
