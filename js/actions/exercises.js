import ActionTypes from './ActionTypes';

export function addExercise(exercise) {
  return {
    type: ActionTypes.ADD_EXERCISE,
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
