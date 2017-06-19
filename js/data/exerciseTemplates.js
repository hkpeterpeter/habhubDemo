// ExerciseTemplate:
//  id (key): number
//  name: string (the name of the exercise in i18n)
//  video: string (the name of the video file)

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
