import React, { Component } from 'react';
import { Image } from 'react-native';
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
  CardItem,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import I18n from '../../i18n/I18n';

class ProgressImageViewer extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
    };

    this.shiftImageIndex = this.shiftImageIndex.bind(this);
  }

  shiftImageIndex(shift = 1, min = 0, max = 0) {
    let newIndex = shift + this.state.currentImageIndex;
    if (newIndex > max) {
      newIndex = min;
    } else if (newIndex < min) {
      newIndex = max;
    }
    this.setState({ currentImageIndex: newIndex });
  }

  render() {
    const navigation = this.props.navigation;
    const userID = this.props.client.userID;
    if (userID === '') { return <Container />; }

    const exerciseID = this.props.client.exerciseID;
    const exercise = this.props.exercises.filter(x => x.id === exerciseID)[0];

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
            <Title>{I18n.t('titleProgressImageViewer')}</Title>
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

          <CardItem style={{ flexDirection: 'row' }}>
            <Left style={{ flex: 1 }}>
              <Button transparent>
                <Icon
                  style={{ fontSize: 35 }}
                  name="ios-arrow-dropleft-outline"
                  onPress={() => { this.shiftImageIndex(-1, 0, exercise.images.length - 1); }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Text style={{ fontSize: 35, alignSelf: 'center' }}>
                {`${this.state.currentImageIndex + 1} / ${exercise.images.length}`}
              </Text>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent>
                <Icon
                  style={{ fontSize: 35 }}
                  name="ios-arrow-dropright-outline"
                  onPress={() => { this.shiftImageIndex(1, 0, exercise.images.length - 1); }}
                />
              </Button>
            </Right>
          </CardItem>

          <CardItem
            cardBody
            button
            style={styles.cardImageWrapper}
          >
            <Image
              source={{ uri: exercise.images[this.state.currentImageIndex], isStatic: true }}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </CardItem>

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
  client: state.client,
  exercises: state.exercises,
});

export default connect(mapStateToProps, bindActions)(ProgressImageViewer);
