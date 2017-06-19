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
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import I18n from '../../i18n/I18n';

import {
  achievementSupportedByFamilyImage,
  achievementHardworkingImage,
} from '../../asset';

const demo = [
  {
    key: 1, // add a key prop to remove a warning message
    text: 'HardworkingPatient',
    img: achievementHardworkingImage,
  },
  {
    key: 2,
    text: 'SupportedByFamily',
    img: achievementSupportedByFamilyImage,
  },
];

class Achievements extends Component { // eslint-disable-line

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
            <Title>{I18n.t('titleAchievements')}</Title>
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

          {demo.map(item => (
            <Card key={item.key}>
              <CardItem icon >
                <Left>
                  <Thumbnail source={item.img} />
                </Left>
                <Body>
                  <Text>{I18n.t(item.text)}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </Card>
           ))}

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

export default connect(mapStateToProps, bindActions)(Achievements);
