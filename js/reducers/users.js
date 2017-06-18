import ActionTypes from '../actions/ActionTypes';

const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
}
