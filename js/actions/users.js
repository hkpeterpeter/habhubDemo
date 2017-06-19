import ActionTypes from './ActionTypes';

export function addUser(user) {
  return {
    type: ActionTypes.ADD_USER,
    user,
  };
}

export function addPatientExercise(patientID, exerciseID) {
  return {
    type: ActionTypes.ADD_PATIENT_EXERCISE,
    patientID,
    exerciseID,
  };
}
