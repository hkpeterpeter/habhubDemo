
import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#FFF',
  },

  cardImageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  cardImage: {
    width: deviceWidth - 20,
    height: deviceHeight / 2.5,
  },
  footerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },


};
