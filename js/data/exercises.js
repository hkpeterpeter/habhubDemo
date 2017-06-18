const makeExercise = (
  id,
  exerciseTemplateID,
  count,
  instruction,
) => ({ id, exerciseTemplateID, count, instruction });

const exercises = [
  makeExercise(0, 0, 20, 'Repeat for 20 times'),
  makeExercise(1, 1, 10, 'Repeat for 10 times'),
];

export default exercises;
