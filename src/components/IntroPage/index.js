import React from 'react';
import {connect} from 'react-redux';
import AppIntro from 'rn-app-intro-screen';
import styles from './styles';

import {setIntroState} from '../../actions';

const slides = [
  {
    key: 'key1',
    title: 'Track Your Spending',
    textStyle: {color: '#22e3c4'},
    titleStyle: {marginTop: 32},
    text: 'Keep track your expenses \n quickly and easily.',
    image: require('../../assets/images/a1.png'),
    imageStyle: styles.image,
    backgroundColor: '#131D28',
  },
  {
    key: 'key2',
    title: 'On The Go',
    titleStyle: {marginTop: 32},
    text: 'Quickly add your incomes & expenses \n on the go',
    image: require('../../assets/images/a2.png'),
    imageStyle: styles.image,
    textStyle: {color: '#22e3c4'},
    backgroundColor: '#131D28',
  },
  {
    key: 'key3',
    title: 'All Your Accounts',
    text: 'Take control of your \n money & assets',
    image: require('../../assets/images/a3.png'),
    imageStyle: styles.image,
    titleStyle: {marginTop: 32},
    textStyle: {color: '#22e3c4'},
    backgroundColor: '#131D28',
  },
  {
    key: 'key4',
    title: 'Plan Ahead',
    text: 'Easily create a your budget and goal plans',
    image: require('../../assets/images/a4.png'),
    imageStyle: styles.image,
    titleStyle: {marginTop: 32},
    textStyle: {color: '#22e3c4'},
    backgroundColor: '#131D28',
  },
  {
    key: 'key5',
    title: 'Get Your Expense Report',
    text: 'Overview your past and current \n spending progress',
    image: require('../../assets/images/a5.png'),
    imageStyle: styles.image,
    titleStyle: {marginTop: 32},
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
