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
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import I18n from '../../i18n/I18n';

class Exercise extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
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
            <Title>{I18n.t('titleExercise')}</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              dark
              onPress={() => navigation.navigate('Settings', { refresh: () => { this.forceUpdate(); } })}
            >
              <Icon name="ios-settings-outline" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Text>{I18n.t('titleExercise')}</Text>
        </Content>

      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // func: () => dispatch(func()),
  };
}

const mapStateToProps = state => ({
  // client: state.client,

});

export default connect(mapStateToProps, bindActions)(Exercise);
