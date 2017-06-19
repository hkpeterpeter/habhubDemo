import React, { Component } from 'react';
import { TouchableOpacity, Slider } from 'react-native';
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
  Picker,
  Item,
  CardItem,
  InputGroup,
  Input,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import styles from './styles';
import I18n from '../../i18n/I18n';

import { setExerciseID } from '../../actions/client';
import { getVideo } from '../../asset';

class PatientExerciseEditor extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
    exerciseTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
    setExerciseID: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const exerciseID = this.props.client.exerciseID;
    let exercise = null;
    if (exerciseID >= 0) {
      exercise = this.props.exercises.filter(x => x.id === exerciseID)[0];
    }
    this.state = {
      paused: false, /* video paused */
      selectedVideoTemplate: exercise ? exercise.exerciseTemplateID : 0,
      count: exercise ? exercise.count : 1,
      instruction: exercise ? exercise.instruction : 'Repeat 1 time',
      startDateTime: exercise
      ? moment(exercise.startDateTime).format('YYYY-MM-DD HH:mm')
      : moment().format('YYYY-MM-DD HH:mm'),
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.playOrPauseVideo = this.playOrPauseVideo.bind(this);
    this.shiftCount = this.shiftCount.bind(this);
  }

  onValueChange(value: string) {
    this.setState({
      selectedVideoTemplate: value,
    });
  }

  playOrPauseVideo() {
    this.setState({ paused: !this.state.paused });
  }
  shiftCount(shift, min = 0) {
    let newCount = shift + this.state.count;
    if (newCount < min) {
      newCount = min;
    }
    this.setState({ count: newCount, instruction: `Repeat for ${newCount} times` });
  }


  render() {
    const navigation = this.props.navigation;

    const patientID = this.props.client.patientID;
    if (patientID === '') { return <Container />; }

    // const exerciseID = this.props.client.exerciseID;
    // const exercises = this.props.exercises;
    const exerciseTemplates = this.props.exerciseTemplates;
    // let exercise = null;
    // if (exerciseID === -1) {
    //   exercise = {
    //     id: exercises.length, // temporary assume exercise won't be deleted..
    //     exerciseTemplateID: 0,
    //     count: 1,
    //     instruction: 'Repeat 1 times',
    //     startDateTime: moment().toISOString(),
    //     completed: false,
    //   };
    // } else {
    //   exercise = exercises.filter(x => x.id === exerciseID)[0];
    // }
    const exerciseTemplate = exerciseTemplates
      .filter(x => x.id === this.state.selectedVideoTemplate)[0];
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
            <Title>{I18n.t('titlePatientExerciseEditor')}</Title>
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

          <Text>Common Exercise:</Text>
          <Picker
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.selectedVideoTemplate}
            onValueChange={this.onValueChange}
          >
            {exerciseTemplates.map(x =>
              <Item key={x.id} label={I18n.t(x.name)} value={x.id} />)}
          </Picker>

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

          <CardItem style={{ flexDirection: 'row' }}>
            <Left style={{ flex: 1 }}>
              <Button transparent>
                <Icon
                  style={{ fontSize: 35 }}
                  name="remove-circle"
                  onPress={() => { this.shiftCount(-1); }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Text style={{ fontSize: 25 }}>
                Count: {this.state.count}
              </Text>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent>
                <Icon
                  style={{ fontSize: 35 }}
                  name="add-circle"
                  onPress={() => { this.shiftCount(1); }}
                />
              </Button>
            </Right>
          </CardItem>

          <InputGroup style={styles.mb}>
            <Icon name="chatboxes" />
            <Input
              placeholder={'instruction'}
              onChangeText={instruction => this.setState({ instruction })}
              value={this.state.instruction}
            />
          </InputGroup>

          <DatePicker
            style={styles.DatePicker}
            date={this.state.startDateTime}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(startDateTime) => { this.setState({ startDateTime }); }}
          />


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
  exercises: state.exercises,
  exerciseTemplates: state.exerciseTemplates,
});

export default connect(mapStateToProps, bindActions)(PatientExerciseEditor);
