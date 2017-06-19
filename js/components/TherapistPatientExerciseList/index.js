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
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import styles from './styles';
import I18n from '../../i18n/I18n';

import { setExerciseID } from '../../actions/client';

class TherapistPatientExerciseList extends Component { // eslint-disable-line

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
    if (userID === '') { return <Container />; }
    const patientID = this.props.client.patientID;
    if (patientID === '') { return <Container />; }

    const patient = this.props.users.filter(x => x.id === patientID)[0];
    const exerciseArray = patient.exerciseIDs.map((id) => {
      const exercise = this.props.exercises.filter(x => x.id === id)[0];
      const exerciseTemplate =
        this.props.exerciseTemplates.filter(x => x.id === exercise.exerciseTemplateID)[0];
      return {
        id,
        displayName: I18n.t(exerciseTemplate.name),
        displayNote: moment(exercise.startDateTime).format('LL'),
      };
    });

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
            <Title>{I18n.t('titleTherapistPatientExerciseList')}</Title>
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

          {exerciseArray.map(item =>
            (<Card key={item.id}>
              <CardItem
                icon
                button
                onPress={() => {
                  this.props.setExerciseID(item.id); // edit an existing exercise
                  navigation.navigate('PatientExerciseEditor', { refresh: () => { this.forceUpdate(); } });
                }}
              >
                <Body style={{ flex: 3 }}>
                  <Text>{item.displayName}</Text>
                  <Text note>{item.displayNote}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </Card>),

            )}

          <Button
            block
            primary
            onPress={() => {
              this.props.setExerciseID(-1); // Create a new exercise
              navigation.navigate('PatientExerciseEditor', { refresh: () => { this.forceUpdate(); } });
            }}
          >
            <Text>{I18n.t('addExerciseButtonText')}</Text>
          </Button>

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

export default connect(mapStateToProps, bindActions)(TherapistPatientExerciseList);
