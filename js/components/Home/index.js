import React, { Component } from 'react';
import { Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Header,
  Title,
  Container,
  Content,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Body,
} from 'native-base';

import styles from './styles';
import I18n from '../../i18n/I18n';

import {
  patientImage,
  therapistImage,
  familyImage,
  exerciseImage,
  achievementsImage,
  patientManagementImage,
  encouragementImage,
  progressImage,
} from '../../asset';

const makeCard = (key, text, image, route) => ({ key, text, image, route });
const patientCards = [
  makeCard('card0', 'titleExerciseList', exerciseImage, 'ExerciseList'),
  makeCard('card1', 'titleProgress', progressImage, 'Progress'),
  makeCard('card2', 'titleAchievements', achievementsImage, 'Achievements'),
];
const therapistCards = [
  makeCard('card0', 'titlePatientManagement', patientManagementImage, 'PatientManagement'),
];

const familyCards = [
  makeCard('card0', 'titleFamilyEncouragement', encouragementImage, 'FamilyEncouragement'),
];


class Home extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      cardIndex: 0,
    };

    this.shiftCardIndex = this.shiftCardIndex.bind(this);
  }

  shiftCardIndex(shift, min = 0, max = 1) {
    let newCardIndex = shift + this.state.cardIndex;
    if (newCardIndex > max) {
      newCardIndex = min;
    } else if (newCardIndex < min) {
      newCardIndex = max;
    }
    this.setState({ cardIndex: newCardIndex });
  }

  render() {
    const navigation = this.props.navigation;
    // const card = cards[this.state.cardIndex];
    const id = this.props.client.userID;
    const users = this.props.users;
    const result = users.filter(x => x.id === id);
    let user = null;
    let displayImage = null;
    let displayName = null;
    let card = null;
    let maxCardIndex = 0;

    if (result.length === 1) {
      user = result[0];
      displayName = `${user.firstName} ${user.lastName}`;
      if (user.role === 'Patient') {
        displayImage = patientImage;
        card = patientCards[this.state.cardIndex];
        maxCardIndex = patientCards.length - 1;
      } else if (user.role === 'Therapist') {
        displayImage = therapistImage;
        card = therapistCards[this.state.cardIndex];
        maxCardIndex = therapistCards.length - 1;
      } else if (user.role === 'Family') {
        displayImage = familyImage;
        card = familyCards[this.state.cardIndex];
        maxCardIndex = familyCards.length - 1;
      }
    }
    return (
      <Container style={styles.container} >

        <Header>
          <Left style={{ flex: 1 }}>
            <Text />
          </Left>
          <Body style={{ flex: 4 }}>
            <Title>{I18n.t('titleHome')}</Title>
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
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={displayImage} large />
                <Body>
                  <Text>{displayName}</Text>
                  <Text note>{user && I18n.t(user.role)}</Text>
                </Body>
              </Left>

            </CardItem>


            <CardItem
              cardBody
              button
              style={styles.cardImageWrapper}
              onPress={() => navigation.navigate(card.route,
                { refresh: () => { this.forceUpdate(); } })}
            >
              <Image
                source={card && card.image}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </CardItem>

            <CardItem style={{ flexDirection: 'row' }}>
              <Left>
                <Button transparent>
                  <Icon
                    style={{ fontSize: 50 }}
                    name="ios-arrow-dropleft-outline"
                    onPress={() => this.shiftCardIndex(-1, 0, maxCardIndex)}
                  />
                </Button>
              </Left>
              <Body style={{ flex: 3 }}>
                <Button
                  block
                  transparent
                  onPress={
                    () => navigation.navigate(
                      card.route,
                      { refresh: () => { this.forceUpdate(); } },
                    )
                  }
                >
                  <Text style={{ fontSize: 20 }}>{card && I18n.t(card.text)}</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent>
                  <Icon
                    style={{ fontSize: 50 }}
                    name="ios-arrow-dropright-outline"
                    onPress={() => this.shiftCardIndex(1, 0, maxCardIndex)}
                  />
                </Button>
              </Right>
            </CardItem>

          </Card>
        </Content>

      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  // routes: state.drawer.routes,
  client: state.client,
  users: state.users,
});

export default connect(mapStateToProps, bindActions)(Home);
// export default Home;
