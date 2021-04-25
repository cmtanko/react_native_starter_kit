import {Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  slides: {
    alignItems: 'center',
    padding: 20,
    height: deviceHeight,
    width: deviceWidth,
  },
  labels: {
    fontSize: '12',
    fill: 'white',
  },
};
