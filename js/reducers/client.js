import ActionTypes from '../actions/ActionTypes';

const initialState = {
  userID: '',
};

export default function client(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER_ID:
      return {
        ...state,
        userID: action.id,
      };
    default:
      return state;
  }
}
