import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#FFF',
  },

  cardImage: {
    width: deviceWidth - 20,
    height: deviceHeight / 2.5,
  },
};
