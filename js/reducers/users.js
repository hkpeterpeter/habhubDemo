import ActionTypes from '../actions/ActionTypes';

const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return [...state, action.user];
    case ActionTypes.ADD_PATIENT_EXERCISE:
      return state.map(item =>
      (item.id === action.patientID && item.exerciseIDs)
      ? { ...item,
        exerciseIDs: item.exerciseIDs.concat(action.exerciseID) }
      : item,
    );
    default:
      return state;
  }
}
