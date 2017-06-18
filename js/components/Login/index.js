// Note:
// Fix ActionSheet + navigation issue
// Reference: https://github.com/GeekyAnts/NativeBase/issues/739

import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';

import {
  Container,
  Button,
  InputGroup,
  Input,
  Text,
  Content,
  Icon,
  ActionSheet,
} from 'native-base';

import { connect } from 'react-redux';
import _string from 'lodash/string';
import PropTypes from 'prop-types';


import styles from './styles';
import I18n from '../../i18n/I18n';

import { setUserID } from '../../actions/client';

import { habhubLogo } from '../../asset';

const languageOptions = [
  'English',  // Index: 0
  '䌓體中文',  // Index: 1
  '简体中文',  // Index: 2
  'Cancel',
];
const languageOptionsCancelIndex = languageOptions.length - 1;


const demoUserOptions = [
  'Peter (Patient)',  // Index: 0
  'Tiffany (Therapist)',  // Index: 1
  'Fiona (Family)',  // Index: 2
  'Cancel',
];
const demoUserOptionsCancelIndex = languageOptions.length - 1;

class Login extends Component { // eslint-disable-line

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    setUserID: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.actionSheet = null;
    this.demoUserSheet = null;

    this.state = {
      name: '',
      password: '',
    };

    this.showActionSheet = this.showActionSheet.bind(this);

    this.showDemoUserSheet = this.showDemoUserSheet.bind(this);

    this.handleAuthLogin = this.handleAuthLogin.bind(this);
  }

  handleAuthLogin() {
    // Here, we use a local server at Redux to do authetication
    // Later, the logic will be moved to a remote server...

    const inputID = _string.toLower(_string.trim(this.state.name));
    const users = this.props.users;

    const result = users.filter(x => x.id === inputID);
    if (result.length === 1) {
      // okay, find a user
      const activeUser = result[0];
      this.props.setUserID(activeUser.id);

      this.props.navigation.navigate('Home');
    }
  }

  showActionSheet() {
    if (this.actionSheet !== null) {
      // Call as you would ActionSheet.show(config, callback)
      this.actionSheet._root.showActionSheet(
        {
          options: languageOptions,
          cancelButtonIndex: languageOptionsCancelIndex,
          title: I18n.t('selectLanguage'),
        }, (buttonIndex) => {
          // this.setState({ clicked: languageOptions[buttonIndex] });

        if (buttonIndex === 0) {
          I18n.locale = 'en';
        } else if (buttonIndex === 1) {
          I18n.locale = 'zh';
        } else if (buttonIndex === 2) {
          I18n.locale = 'cn';
        }

        this.forceUpdate();
      },
      );
    }
  }

  showDemoUserSheet() {
    if (this.demoUserSheet !== null) {
      this.demoUserSheet._root.showActionSheet(
        {
          options: demoUserOptions,
          cancelButtonIndex: demoUserOptionsCancelIndex,
          title: 'Demo Users',
        }, (buttonIndex) => {
          // this.setState({ clicked: languageOptions[buttonIndex] });

        if (buttonIndex === 0) {
          this.props.setUserID('peter');
          this.props.navigation.navigate('Home');
        } else if (buttonIndex === 1) {
          this.props.setUserID('tiffany');
          this.props.navigation.navigate('Home');
        } else if (buttonIndex === 2) {
          this.props.setUserID('fiona');
          this.props.navigation.navigate('Home');
        }
      },
      );
    }
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container} >
        <Content padder>

          <View style={styles.logoWrapper}>
            <Image
              source={habhubLogo}
              style={styles.logo}
              resizeMode={'contain'}
            />
          </View>

          <InputGroup style={styles.mb}>
            <Icon name="ios-person" />
            <Input
              placeholder={I18n.t('username')}
              onChangeText={name => this.setState({ name })}
            />

            <Button
              info
              style={styles.mb}
              onPress={() => this.showDemoUserSheet()}
            >
              <Text>{I18n.t('Demo')}</Text>
            </Button>
            <ActionSheet ref={(c) => { this.demoUserSheet = c; }} />


          </InputGroup>

          <InputGroup style={styles.mb}>
            <Icon name="ios-unlock-outline" />
            <Input
              placeholder={I18n.t('password')}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
            />
          </InputGroup>

          <Button
            block
            primary
            style={styles.mb}

            onPress={this.handleAuthLogin}
            // onPress={() => navigate('Home')}
          >
            <Text>{I18n.t('login')}</Text>
          </Button>

          <Button
            block
            info
            style={styles.mb}
            onPress={() => this.showActionSheet()}
          >
            <Text>{I18n.t('changeLocale')}</Text>
          </Button>
          <ActionSheet ref={(c) => { this.actionSheet = c; }} />

          <Button block info style={styles.mb}>
            <Text>{I18n.t('register')}</Text>
          </Button>

        </Content>

      </Container>

    );
  }
}

function bindActions(dispatch) {
  return {
    setUserID: id => dispatch(setUserID(id)),
  };
}

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, bindActions)(Login);
