import ActionTypes from '../actions/ActionTypes';

const initialState = [];

export default function exercises(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_EXERCISE:
      return [...state, action.exercise];
    case ActionTypes.UPDATE_EXERCISE:
      return state.map(item =>
      (item.id === action.id)
      ? { ...item,
        ...action.exercise }
      : item,
    );
    case ActionTypes.UPDATE_EXERCISE_PROGRESS:
      return state.map(item =>
        (item.id === action.id)
        ? { ...item,
          completed: true,
          completedCount: action.completedCount,
          completedDateTime: action.completedDateTime,
          feeling: action.feeling }
        : item,
      );
    case ActionTypes.ADD_EXERCISE_IMAGE:
      return state.map(item =>
          (item.id === action.id && item.images)
          ? { ...item,
            images: item.images.concat(action.imageURL),
          }
          : item,
        );
    default:
      return state;
  }
}
