import ActionTypes from './ActionTypes';

export function addExerciseTemplate(exerciseTemplate) {
  return {
    type: ActionTypes.ADD_EXERCISE_TEMPLATE,
    exerciseTemplate,
  };
}
