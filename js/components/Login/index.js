// Note:
//  1 - Fix ActionSheet + navigation issue
//    - Reference: https://github.com/GeekyAnts/NativeBase/issues/739

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

import styles from './styles';
import I18n from '../../i18n/I18n';

const habhubLogo = require('../../../img/habhub-logo.png');

const languageOptions = [
  'English',  // Index: 0
  '䌓體中文',  // Index: 1
  '简体中文',  // Index: 2
  'Cancel',
];
const languageOptionsCancelIndex = languageOptions.length - 1;

class Login extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.actionSheet = null;
    this.demoUserSheet = null;

    this.state = {
      name: '',
      password: '',
    };

    this.showActionSheet = this.showActionSheet.bind(this);
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

  render() {
    const { navigate } = this.props.navigation;
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

            // onPress={this.handleAuthLogin}
            onPress={() => navigate('Home')}
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

          {/* <Text>{this.props.locale}</Text> */}

        </Content>

      </Container>
      // <View>
      //   <Text>Login</Text>
      //   <Button
      //     onPress={() => navigate('Home')}
      //     title="Go to Home"
      //   />
      // </View>
    );
  }
}

export default Login;
