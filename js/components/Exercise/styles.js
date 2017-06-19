
import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
// const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#FFF',
  },
  videoPlayer: {
    alignSelf: 'stretch',
    height: deviceHeight / 4,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  rowItem: {
    flex: 1,
    marginRight: 5,
  },
  row: {
    marginBottom: 0,
    paddingBottom: 5,
    marginTop: 0,
    paddingTop: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
};
