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

import styles from './styles';
import I18n from '../../i18n/I18n';

import { setPatientID } from '../../actions/client';

class PatientManagement extends Component { // eslint-disable-line

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    setPatientID: PropTypes.func.isRequired,
  }

  render() {
    const navigation = this.props.navigation;
    const userID = this.props.client.userID;
    if (userID === '') { return <Container />; }

    const user = this.props.users.filter(x => x.id === userID)[0];
    const patientIDs = user.patientIDs;

    const patientArray = patientIDs.map((id) => {
      const patient = this.props.users.filter(x => x.id === id)[0];
      const displayName = `${patient.firstName} ${patient.lastName}`;
      return {
        id,
        displayName,
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
            <Title>{I18n.t('titlePatientManagement')}</Title>
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

          {patientArray.map(item =>
            (<Card key={item.id}>
              <CardItem
                icon
                button
                onPress={() => {
                 // this.props.setActivePatient(item.id);
                 // Actions.patientExerciseList();
                  this.props.setPatientID(item.id);
                }}
              >
                <Body style={{ flex: 3 }}>
                  <Text>{item.displayName}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </Card>),

           )}

          <Button block primary >
            <Text>{I18n.t('addPatientButtonText')}</Text>
          </Button>

        </Content>

      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // func: () => dispatch(func()),
    setPatientID: id => dispatch(setPatientID(id)),
  };
}

const mapStateToProps = state => ({
  // client: state.client,
  client: state.client,
  users: state.users,

});

export default connect(mapStateToProps, bindActions)(PatientManagement);
