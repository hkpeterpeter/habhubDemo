import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import { NavigationActions } from 'react-navigation';

// Reference: https://reactnavigation.org/docs/navigators/navigation-actions
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' }),
  ],
});


class Home extends Component { // eslint-disable-line

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <Text>Home</Text>

        <Button
          onPress={() => navigation.dispatch(resetAction)}
          title="Logout"
        />
      </View>
    );
  }
}

export default Home;
