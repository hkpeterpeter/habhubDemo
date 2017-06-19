import ActionTypes from '../actions/ActionTypes';

const initialState = [];

export default function exercises(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_EXERCISE:
      return [...state, action.exercise];
    case ActionTypes.UPDATE_EXERCISE_PROGRESS:
      return state.map(item =>
        (item.id === action.id)
        ? { ...item,
          completed: true,
          completedCount: action.completedCount,
          feeling: action.feeling }
        : item,
      );
    default:
      return state;
  }
}
