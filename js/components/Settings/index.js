import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Text,
  Button,
  Icon,
  Title,
  Content,
  ActionSheet,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import styles from './styles';
import I18n from '../../i18n/I18n';

import { setUserID } from '../../actions/client';

// Reference: https://reactnavigation.org/docs/navigators/navigation-actions
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' }),
  ],
});

const languageOptions = [
  '🇺🇸 English',  // Index: 0
  '🇹🇼 䌓體中文',  // Index: 1
  '🇨🇳 简体中文',  // Index: 2
  'Cancel',
];
const languageOptionsCancelIndex = languageOptions.length - 1;

class Settings extends Component { // eslint-disable-line

  static propTypes = {
    setUserID: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.actionSheet = null;

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
    const navigation = this.props.navigation;
    return (
      <Container style={styles.container}>

        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              dark
              onPress={() => { navigation.state.params.refresh(); navigation.goBack(); }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title>{I18n.t('titleSettings')}</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Text />
          </Right>
        </Header>

        <Content padder>

          <Button
            iconLeft
            bordered
            info
            block
            style={styles.mb}
            onPress={() => this.showActionSheet()}
          >
            <Icon name="chatbubbles" />
            <Text>{I18n.t('changeLocale')} 🇺🇸 🇹🇼 🇨🇳 </Text>
          </Button>
          <ActionSheet ref={(c) => { this.actionSheet = c; }} />

          <Button
            iconLeft
            danger
            block
            style={styles.mb}
            onPress={() => { this.props.setUserID(''); navigation.dispatch(resetAction); }}
          >
            <Icon name="power" />
            <Text>{I18n.t('logout')}</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // func: () => dispatch(func()),

    setUserID: id => dispatch(setUserID(id)),
  };
}

const mapStateToProps = state => ({
  // client: state.client,

});

export default connect(mapStateToProps, bindActions)(Settings);
