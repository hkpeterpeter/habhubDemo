const makeExerciseTemplate = (
  id,
  name,
  video) => ({ id, name, video });

const exerciseTemplates = [
  makeExerciseTemplate(0, 'exerciseUpperLimb', 'exercise-upper-limb'),
  makeExerciseTemplate(1, 'exerciseLowerLimb', 'exercise-lower-limb'),
  makeExerciseTemplate(2, 'exerciseWalk', 'exercise-walk'),
];

export default exerciseTemplates;
