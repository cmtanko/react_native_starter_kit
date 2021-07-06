import {Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import {COLOR_TERTIARY} from '../../styles/common';

export default {
  slides: {
    alignItems: 'center',
    padding: 20,
    height: deviceHeight,
    width: deviceWidth,
  },
  labels: {
    fontSize: '10',
    fill: 'white',
  },
  legend: {
    labels: {fill: 'white', fontSize: 10},
  },
  lineChart: {
    data: {stroke: COLOR_TERTIARY},
  },
  scatterChart: {
    labels: {fill: COLOR_TERTIARY, padding: 8},
    data: {
      stroke: COLOR_TERTIARY,
      strokeWidth: 4,
    },
  },
  animate100: {
    duration: 100,
  },
  animate500: {
    duration: 500,
  },
  animate1000: {
    duration: 1000,
  },
  colorScale: ['tomato', 'orange', 'gold', 'cyan', 'navy'],
  width: deviceWidth,
  height: deviceHeight,
};
