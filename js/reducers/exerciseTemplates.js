import ActionTypes from '../actions/ActionTypes';

const initialState = [];

export default function exerciseTemplates(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_EXERCISE_TEMPLATE:
      return [...state, action.exerciseTemplate];
    default:
      return state;
  }
}
