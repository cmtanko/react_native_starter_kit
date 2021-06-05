import React from 'react';
import {connect} from 'react-redux';
import AppIntro from 'rn-app-intro-screen';
import styles from './styles';

import {setIntroState} from '../../actions';

const slides = [
  {
    key: 'somethun',
    title: 'Track Your Spending',
    textStyle: {color: '#22e3c4'},
    text: 'It helps you to track\n your expenses quickly and easily.',
    image: require('../../assets/images/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#131D28',
  },
  {
    key: 'somethun-dos',
    title: 'Plan Your Budget',
    text:
      'Easy and user friendly \nPersonal Finance App to take control of your money',
    image: require('../../assets/images/intro2.png'),
    imageStyle: styles.image,
    textStyle: {color: '#22e3c4'},
    backgroundColor: '#131D28',
  },
  {
    key: 'somethun1',
    title: 'Get Your Monthly Report',
    text: 'Overview your past and current spending progress by category',
    image: require('../../assets/images/intro3.png'),
    imageStyle: styles.image,
    textStyle: {color: '#22e3c4'},
    backgroundColor: '#131D28',
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppIntro
        dotStyle={{backgroundColor: '#8888aa'}}
        textStyle={{color: 'red', backgroundColor: 'green'}}
        activeDotStyle={{backgroundColor: '#22e3c4'}}
        slides={slides}
        onDone={() => this.props.setIntroState(false)}
      />
    );
  }
}

export default connect(null, {
  setIntroState,
})(App);
