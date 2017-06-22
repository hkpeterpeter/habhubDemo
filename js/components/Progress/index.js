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
  Card,
  CardItem,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import I18n from '../../i18n/I18n';

import { setExerciseID } from '../../actions/client';

class Progress extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
    exerciseTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
    setExerciseID: PropTypes.func.isRequired,
  }

  render() {
    const navigation = this.props.navigation;

    const userID = this.props.client.userID;
    const users = this.props.users;
    const exercises = this.props.exercises;
    const exerciseTemplates = this.props.exerciseTemplates;

    const r = users.filter(x => x.id === userID);
    let exerciseArray = null;

    if (r.length === 1) {
      const user = r[0];
      const exerciseIDs = user.exerciseIDs;

      if (exerciseIDs) {
        exerciseArray = exerciseIDs.map((id) => {
          const exercise = exercises.filter(x => x.id === id)[0];
          const exerciseTemplate = exerciseTemplates.filter(
            x => x.id === exercise.exerciseTemplateID)[0];

          if (exercise && exercise.completed) {
            return { ...exercise, name: exerciseTemplate.name };
          }
          return null;
        });
      }
    }

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
            <Title>{I18n.t('titleProgress')}</Title>
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

          {exerciseArray && exerciseArray.map(item =>
            (item && <Card key={item.id}>
              <CardItem
                icon
                button
                style={{ flexDirection: 'row' }}
                onPress={
                  () => {
                    // TODO:
                  }
                }
              >
                <Left style={{ flex: 1 }}>
                  {item.feeling === 0
                    ? <Icon name="ios-happy-outline" />
                    : (
                      item.feeling === 1
                      ? <Icon name="ios-stopwatch-outline" />
                      : <Icon name="ios-sad-outline" />
                    ) }
                </Left>

                <Body style={{ flex: 3 }}>
                  <Text>{I18n.t(item.name)}</Text>
                  {/* <Text note>{item.description}</Text> */}
                  <Text note>{`${item.completedCount} / ${item.count}`}</Text>
                </Body>
                <Right style={{ flex: 2 }}>
                  {/* <Icon name="arrow-forward" /> */}
                  <Button
                    iconLeft
                    bordered
                    info
                    onPress={() => {
                      if (item.images.length > 0) {
                        this.props.setExerciseID(item.id);
                        navigation.navigate('ProgressImageViewer',
                        { refresh: () => { this.forceUpdate(); } });
                      }
                    }}
                  >
                    <Icon name="ios-camera" />
                    <Text>{item.images.length}</Text>
                  </Button>
                </Right>
              </CardItem>

              {/* {item.images.length > 0 && <Image
                source={{ uri: item.images[0], isStatic: true }}
                style={styles.cardImage}
                resizeMode="contain"
              />} */}

            </Card>),
          )}
        </Content>

      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // func: () => dispatch(func()),
    setExerciseID: id => dispatch(setExerciseID(id)),
  };
}

const mapStateToProps = state => ({
  // client: state.client,
  client: state.client,
  users: state.users,
  exercises: state.exercises,
  exerciseTemplates: state.exerciseTemplates,

});

export default connect(mapStateToProps, bindActions)(Progress);
