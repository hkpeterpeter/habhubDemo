import ActionTypes from '../actions/ActionTypes';

// userID: string (used by all roles)
// exerciseID: number (used by patient/therapist)
// patientID: string (used by therapist)

const initialState = {
  userID: '',
  exerciseID: -1,
  patientID: '',
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
    case ActionTypes.SET_PATIENT_ID:
      return {
        ...state,
        patientID: action.id,
      };
    default:
      return state;
  }
}
