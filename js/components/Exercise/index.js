import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
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
  ListItem,
  Thumbnail,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import moment from 'moment';

import { getVideo, therapistImage } from '../../asset';
import styles from './styles';
import I18n from '../../i18n/I18n';

import { setExerciseID } from '../../actions/client';
import { updateExerciseProgress } from '../../actions/exercises';

class Exercise extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
    exerciseTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
    setExerciseID: PropTypes.func.isRequired,
    updateExerciseProgress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const exerciseID = this.props.client.exerciseID;
    const exercises = this.props.exercises;
    let exercise = null;
    if (exerciseID >= 0 && exercises && exercises.length > 0) {
      exercise = exercises.filter(x => x.id === exerciseID)[0];
    }

    this.state = {
      paused: false, /* video paused */
      value: (exercise && exercise.completed) ?
        parseFloat(exercise.completedCount) / exercise.count : 0,  /* slider value */
      feeling: (exercise && exercise.completed) ? exercise.feeling : 0,  /* feeling: 0,1,2 */
    };
    this.playOrPauseVideo = this.playOrPauseVideo.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
  }

  playOrPauseVideo() {
    this.setState({ paused: !this.state.paused });
  }

  handleSaveButton(id, completedCount, completedDateTime, feeling) {
    this.props.updateExerciseProgress(id, completedCount, completedDateTime, feeling);
    this.props.setExerciseID(-1);

    const navigation = this.props.navigation;
    navigation.state.params.refresh();
    navigation.goBack();
  }

  handleCancelButton() {
    this.props.setExerciseID(-1);

    const navigation = this.props.navigation;
    navigation.state.params.refresh();
    navigation.goBack();
  }


  render() {
    const navigation = this.props.navigation;
    const exerciseID = this.props.client.exerciseID;
    const exercises = this.props.exercises;
    const exerciseTemplates = this.props.exerciseTemplates;
    let exercise = null;
    let exerciseTemplate = null;
    if (exerciseID >= 0 && exercises && exercises.length > 0) {
      exercise = exercises.filter(x => x.id === exerciseID)[0];
      exerciseTemplate = exerciseTemplates.filter(x => x.id === exercise.exerciseTemplateID)[0];
    }

    // Special case for logout..
    if (exercise === null) { return <Container />; }

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
            <Title>{exerciseTemplate && I18n.t(exerciseTemplate.name)}</Title>
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
          <TouchableOpacity onPress={this.playOrPauseVideo} >
            <Video
              source={getVideo(exerciseTemplate.video)}
              ref={(ref) => { this.player = ref; }}
              muted={false}
              paused={this.state.paused}
              repeat={false}
              resizeMode="cover"
              volume={1.0}
              rate={1.0}
              style={styles.videoPlayer}
            />
          </TouchableOpacity>

          <ListItem style={styles.row}>
            <Thumbnail source={therapistImage} />
            <Body>
              <Text>Therapist</Text>
              <Text note>{exercise.instruction} </Text>
            </Body>
          </ListItem>

          <ListItem itemDivider>
            <Text>{I18n.t('exerciseRecord')}</Text>
          </ListItem>

          <ListItem style={styles.row}>
            <Body >
              <Slider
                value={this.state.value}
                onValueChange={(value) => { this.setState({ value }); }}
              />
            </Body>
            <Right>
              <Text> { parseInt(this.state.value * (exercise.count), 10) }</Text>
            </Right>
          </ListItem>

          <ListItem style={styles.row}>
            <Button
              success
              bordered
              style={styles.rowItem}
              onPress={() => { this.setState({ feeling: 0 }); }}
            >
              <Icon name="ios-happy-outline" /><Text>
                { (this.state.feeling === 0) ? '\u2713' : '' }</Text>
            </Button>

            <Button
              warning
              bordered
              style={styles.rowItem}
              onPress={() => { this.setState({ feeling: 1 }); }}
            >
              <Icon name="ios-stopwatch-outline" /><Text>
                { (this.state.feeling === 1) ? '\u2713' : '' }</Text>
            </Button>

            <Button
              danger
              bordered
              style={styles.rowItem}
              onPress={() => { this.setState({ feeling: 2 }); }}
            >
              <Icon name="ios-sad-outline" /><Text>
                { (this.state.feeling === 2) ? '\u2713' : '' }</Text>
            </Button>
          </ListItem>

          <ListItem style={styles.row}>
            <Button
              info
              bordered
              style={styles.rowItem}
              onPress={() => {
                this.setState({ paused: true });
                // Actions.camera();
                navigation.navigate('CameraGui', { refresh: () => { this.forceUpdate(); } });
              }}
            >
              <Icon name="ios-camera" />
            </Button>
            <Button info bordered style={styles.rowItem}>
              <Icon name="ios-mic" />
            </Button>
            <Button info bordered style={styles.rowItem}>
              <Icon name="ios-create" />
            </Button>
          </ListItem>

          <ListItem style={styles.row}>
            <Button
              success
              bordered
              style={styles.rowItem}
              onPress={() =>
                this.handleSaveButton(
                  exerciseID,
                  parseInt(this.state.value * (exercise.count), 10),
                  moment().toISOString(),
                  this.state.feeling,
                )}
            >
              <Icon name="checkmark-circle" />
              <Text>{I18n.t('Save')}</Text>
            </Button>
            <Button
              danger
              bordered
              style={styles.rowItem}
              onPress={this.handleCancelButton}
            >
              <Icon name="close-circle" />
              <Text>{I18n.t('Cancel')}</Text>
            </Button>
          </ListItem>


        </Content>

      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // func: () => dispatch(func()),
    setExerciseID: id => dispatch(setExerciseID(id)),
    updateExerciseProgress: (id, completedCount, completedDateTime, feeling) =>
                  dispatch(updateExerciseProgress(id, completedCount, completedDateTime, feeling)),
  };
}

const mapStateToProps = state => ({
  // client: state.client,
  client: state.client,
  exercises: state.exercises,
  exerciseTemplates: state.exerciseTemplates,

});

export default connect(mapStateToProps, bindActions)(Exercise);
