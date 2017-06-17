import ActionTypes from '../actions/ActionTypes';

//import users from '../data/users';

const initialState = [];

export default function server(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
}
