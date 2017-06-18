import ActionTypes from '../actions/ActionTypes';

const initialState = [];

export default function exercises(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_EXERCISE:
      return [...state, action.exercise];
    default:
      return state;
  }
}
