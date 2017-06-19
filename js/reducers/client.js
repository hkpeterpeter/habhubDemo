import ActionTypes from '../actions/ActionTypes';

const initialState = {
  userID: '',
  exerciseID: -1,
};

export default function client(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER_ID:
      return {
        ...state,
        userID: action.id,
      };
    case ActionTypes.SET_EXERCISE_ID:
      return {
        ...state,
        exerciseID: action.id,
      };
    default:
      return state;
  }
}
