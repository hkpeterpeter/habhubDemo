// Exercise:
//  id (key): number
//  exerciseTemplateID (foreignKey): number
//  count: number - The number of times assigned
//  instruction: string - The instruction given by PT
//  startDateTime: string - toISOString generated by moment library
//  completed: boolean - finish the exercise or not
//
//  Optional attributes: completed is true
//    completedCount: number
//    completedDateTime: string - toISOString generated by moment library
//    feeling: 0, 1, 2 (Bad, Normal, Good)
//
//    images: []: array of string (path to the disk)

import moment from 'moment';

const m2s = m => m.toISOString();
const makeExercise = (
  id,
  exerciseTemplateID,
  count,
  instruction,
  startDateTime,
  completed,
) => ({ id,
  exerciseTemplateID,
  count,
  instruction,
  startDateTime,
  completed,
  completedCount: 0,
  completedDateTime: '',
  feeling: 0,
  images: [],
});

const exercises = [
  {
    ...makeExercise(0, 2, 50, 'Walk 50 steps', m2s(moment().subtract(30, 'minutes')), true),
    completedCount: 50,
    completedDateTime: m2s(moment().subtract(20, 'minutes')),
    feeling: 0,
  },
  makeExercise(1, 0, 20, 'Repeat for 20 times', m2s(moment().add(1, 'minutes')), false),
  // makeExercise(2, 1, 10, 'Repeat for 10 times', m2s(moment().add(3, 'hours')), false),
  // makeExercise(3, 0, 20, 'Repeat for 20 times', m2s(moment().subtract(1, 'day')), false),
  // makeExercise(4, 2, 50, 'Walk 50 steps', m2s(moment().add(1, 'days')), false),
  // makeExercise(5, 0, 10, 'Repeat for 10 times', m2s(moment().subtract(2, 'days')), false),
];

export default exercises;
