
const habhubLogo = require('../../img/habhub-logo.png');

const patientImage = require('../../img/patient.png');
const therapistImage = require('../../img/physical-therapist.png');
const familyImage = require('../../img/family.png');

const exerciseImage = require('../../img/patient-feature-exercise.png');
const achievementsImage = require('../../img/patient-feature-achievements.png');
const progressImage = require('../../img/patient-feature-progress.png');

const patientManagementImage = require('../../img/therapist-feature-patient-management.png');
const encouragementImage = require('../../img/family-feature-encouragement.png');



const exerciseLowerLimbVideo = require('../../video/exercise-lower-limb.mp4');
const exerciseUpperLimbVideo = require('../../video/exercise-upper-limb.mp4');
const exerciseWalkVideo = require('../../video/exercise-walk.mp4');

export function getVideo(filename) {
  if (filename === 'exercise-lower-limb') {
    return exerciseLowerLimbVideo;
  } else if (filename === 'exercise-upper-limb') {
    return exerciseUpperLimbVideo;
  } else if (filename === 'exercise-walk') {
    return exerciseWalkVideo;
  }
  return null;
}

export {
  habhubLogo,
  patientImage,
  therapistImage,
  familyImage,
  exerciseImage,
  achievementsImage,
  patientManagementImage,
  encouragementImage,
  progressImage,
};
