import React from 'react';
import { Platform } from 'react-native';

// Reference: https://github.com/react-community/react-navigation/blob/master/examples/NavigationPlayground/js/App.js
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Login from './components/Login';

const habhubRoutes = {
  Login: {
    name: 'Login',
    description: 'The login page',
    screen: Login,
  },
  Home: {
    name: 'Home',
    description: 'The home page',
    screen: Home,
  },
};


const Root = StackNavigator(
  {
    ...habhubRoutes,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none', // no header
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  },
);

export default () => <Root />;
