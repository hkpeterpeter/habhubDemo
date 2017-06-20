import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import Camera, { constants as CameraConst } from 'react-native-camera';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  Button,
  Icon,
} from 'native-base';


import { setDebug } from '../../actions/client';
import { addExerciseImage } from '../../actions/exercises';

import styles from './styles';

const imgCameraRear = require('./assets/ic_camera_rear_white.png');
const imgCameraFront = require('./assets/ic_camera_front_white.png');
const imgFlashAuto = require('./assets/ic_flash_auto_white.png');
const imgFlashOn = require('./assets/ic_flash_on_white.png');
const imgFlashOff = require('./assets/ic_flash_off_white.png');
const imgPhotoCamera = require('./assets/ic_photo_camera_36pt.png');
const imgVideoCam = require('./assets/ic_videocam_36pt.png');
const imgStopButton = require('./assets/ic_stop_36pt.png');

class CameraGui extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setDebug: PropTypes.func.isRequired,
    addExerciseImage: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: CameraConst.Aspect.fill,
        // captureTarget: CameraConst.CaptureTarget.cameraRoll,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: CameraConst.Type.back,
        orientation: CameraConst.Orientation.auto,
        flashMode: CameraConst.FlashMode.auto,
      },
      isRecording: false,
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
         .then((data) => {
           this.props.setDebug(data);

           const exerciseID = this.props.client.exerciseID;
           if (exerciseID >= 0) {
             this.props.addExerciseImage(exerciseID, data.path);
           }

           const navigation = this.props.navigation;
           navigation.state.params.refresh();
           navigation.goBack();
         })
         .catch(err => this.props.setDebug(err));
    }
  }

  startRecording = () => {
    if (this.camera) {
      this.camera.capture({ mode: CameraConst.CaptureMode.video })
           .then(data => this.props.setDebug(data))
           .catch(err => this.props.setDebug(err));
      this.setState({
        isRecording: true,
      });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false,
      });
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = CameraConst.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = CameraConst.Type;


    if (this.state.camera.type === back) {
      icon = imgCameraRear;
    } else if (this.state.camera.type === front) {
      icon = imgCameraFront;
    }
    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = CameraConst.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }
    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = CameraConst.FlashMode;
    if (this.state.camera.flashMode === auto) {
      icon = imgFlashAuto;
    } else if (this.state.camera.flashMode === on) {
      icon = imgFlashOn;
    } else if (this.state.camera.flashMode === off) {
      icon = imgFlashOff;
    }
    return icon;
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image source={this.typeIcon} />
          </TouchableOpacity>

          <Button
            transparent
            onPress={() => { navigation.state.params.refresh(); navigation.goBack(); }}
          >
            <Icon name="arrow-back" style={{ color: '#FFFFFF' }} />
          </Button>

          <Button
            transparent
            onPress={() => navigation.navigate('Settings', { refresh: () => { this.forceUpdate(); } })}
          >
            <Icon name="ios-settings-outline" style={{ color: '#FFFFFF' }} />
          </Button>

          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image source={this.flashIcon} />
          </TouchableOpacity>

        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          { !this.state.isRecording &&
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.takePicture}
            >
              <Image
                source={imgPhotoCamera}
              />
            </TouchableOpacity>
           }


          <View style={styles.buttonsSpace} />
          {
               (!this.state.isRecording
               &&
               <TouchableOpacity
                 style={styles.captureButton}
                 onPress={this.startRecording}
               >
                 <Image source={imgVideoCam} />
               </TouchableOpacity>)
               ||
               <TouchableOpacity
                 style={styles.captureButton}
                 onPress={this.stopRecording}
               >
                 <Image source={imgStopButton} />
               </TouchableOpacity>
           }

        </View>
      </View>
    );
  }
}


function bindActions(dispatch) {
  return {
    // openDrawer: () => dispatch(openDrawer()),

    setDebug: obj => dispatch(setDebug(obj)),
    addExerciseImage: (id, imageURL) => dispatch(addExerciseImage(id, imageURL)),
  };
}

const mapStateToProps = state => ({
  // locale: state.locale.locale,
  client: state.client,
});

export default connect(mapStateToProps, bindActions)(CameraGui);
