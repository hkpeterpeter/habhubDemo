import React from 'react';
import { Platform } from 'react-native';

// Reference: https://github.com/react-community/react-navigation/blob/master/examples/NavigationPlayground/js/App.js
import { StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './store';


import Home from './components/Home';
import Login from './components/Login';
import Settings from './components/Settings';
import ExerciseList from './components/ExerciseList';
import Achievements from './components/Achievements';
import Progress from './components/Progress';
import PatientManagement from './components/PatientManagement';
import FamilyEncouragement from './components/FamilyEncouragement';
import Exercise from './components/Exercise';
import CameraGui from './components/CameraGui';
import TherapistPatientExerciseList from './components/TherapistPatientExerciseList';
import PatientExerciseEditor from './components/PatientExerciseEditor';
import ProgressImageViewer from './components/ProgressImageViewer';

const habhubRoutes = {
  Login: {
    name: 'Login',
    screen: Login,
  },
  Home: {
    name: 'Home',
    screen: Home,
  },
  Settings: {
    name: 'Settings',
    screen: Settings,
  },
  ExerciseList: {
    name: 'ExerciseList',
    screen: ExerciseList,
  },
  Achievements: {
    name: 'Achievements',
    screen: Achievements,
  },
  Progress: {
    name: 'Progress',
    screen: Progress,
  },
  PatientManagement: {
    name: 'PatientManagement',
    screen: PatientManagement,
  },
  FamilyEncouragement: {
    name: 'FamilyEncouragement',
    screen: FamilyEncouragement,
  },
  Exercise: {
    name: 'Exercise',
    screen: Exercise,
  },
  CameraGui: {
    name: 'CameraGui',
    screen: CameraGui,
  },
  TherapistPatientExerciseList: {
    name: 'TherapistPatientExerciseList',
    screen: TherapistPatientExerciseList,
  },
  PatientExerciseEditor: {
    name: 'PatientExerciseEditor',
    screen: PatientExerciseEditor,
  },
  ProgressImageViewer: {
    name: 'ProgressImageViewer',
    screen: ProgressImageViewer,
  },
};

const RootNavigator = StackNavigator(
  {
    ...habhubRoutes,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none', // no header
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  },
);


export default () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);
