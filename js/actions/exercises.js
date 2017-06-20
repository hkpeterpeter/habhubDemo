import ActionTypes from './ActionTypes';

export function addExercise(exercise) {
  return {
    type: ActionTypes.ADD_EXERCISE,
    exercise,
  };
}

export function updateExercise(id, exercise) {
  return {
    type: ActionTypes.UPDATE_EXERCISE,
    id,
    exercise,
  };
}

export function updateExerciseProgress(id, completedCount, completedDateTime, feeling) {
  return {
    type: ActionTypes.UPDATE_EXERCISE_PROGRESS,
    id,
    completedCount,
    completedDateTime,
    feeling,
  };
}

export function addExerciseImage(id, imageURL) {
  return {
    type: ActionTypes.ADD_EXERCISE_IMAGE,
    id,
    imageURL,
  };
}
