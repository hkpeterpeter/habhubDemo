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


class ExerciseList extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
    exerciseTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
    setExerciseID: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentMoment: moment(), // The current date (controlled by buttons)
      currentTime: moment(), // The actual current time
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: moment(),
      });
    }, 1000); // set interval when the component is mounted
  }

  componentWillUnmount() {
    clearInterval(this.timer); // clear interval when the component is unmounted
  }

  shiftDay(shift = 1) {
    this.setState({ currentMoment: this.state.currentMoment.add(shift, 'day') });
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
      const currentTime = this.state.currentTime;
      //const currentTime = moment();

      if (exerciseIDs) {
        exerciseArray = exerciseIDs.map((id) => {
          const exercise = exercises.filter(x => x.id === id)[0];
          const exerciseTemplate = exerciseTemplates.filter(
            x => x.id === exercise.exerciseTemplateID)[0];

          const exerciseMoment = moment(exercise.startDateTime);

          // exercise on the same date of the currentMoment
          if (this.state.currentMoment.isSame(exerciseMoment, 'day')) {
            const timeDiff = exerciseMoment.diff(currentTime);
            const description = `${moment.duration(timeDiff).humanize('minutes')}`;
            return {
              id,
              name: exerciseTemplate.name,
              description,
              completed: exercise.completed,
            };
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
            <Title>{I18n.t('titleExerciseList')}</Title>
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
                  onPress={() => { this.shiftDay(-1); }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 4 }}>
              <Text style={styles.dateText}>
                {this.state.currentMoment.format('LL')}
              </Text>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent>
                <Icon
                  style={{ fontSize: 35 }}
                  name="ios-arrow-dropright-outline"
                  onPress={() => { this.shiftDay(1); }}
                />
              </Button>
            </Right>
          </CardItem>

          <Button
            block
            primary
            style={styles.mb}

            onPress={() => this.setState({ currentMoment: moment() })}
            // onPress={() => navigate('Home')}
          >
            <Text>{I18n.t('TodayButtonText')}</Text>
          </Button>


          {exerciseArray && exerciseArray.map(item =>
            (item && <Card key={item.id}>
              <CardItem
                icon
                button
                style={{ flexDirection: 'row' }}
                onPress={
                  () => {
                    this.props.setExerciseID(item.id);
                    navigation.navigate('Exercise', { refresh: () => { this.forceUpdate(); } });
                  }
                }
              >
                <Left style={{ flex: 1 }}>
                  {item.completed ? <Icon name="checkmark-circle" /> : <Icon name="clock" />}
                </Left>
                <Body style={{ flex: 4 }}>
                  <Text>{I18n.t(item.name)}</Text>
                  <Text note>{item.description}</Text>
                </Body>
                <Right style={{ flex: 1 }}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </Card>),

            )}

        </Content>

      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // func: p => dispatch(func(p)),
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

export default connect(mapStateToProps, bindActions)(ExerciseList);
