import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    backgroundColor: '#FFF',
  },

  mb: {
    marginBottom: 10,
  },

  logo: {
    // control the height to adjust the logo size
    height: deviceHeight / 3,
    marginTop: 20,
    marginBottom: 20,
  },

  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },

};
