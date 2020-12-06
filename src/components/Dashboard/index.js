import React, {Component} from 'react';
import {View, Button} from 'react-native';

export default class Dashboard extends Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => navigate('HomeScreenPageOne')}
          title="Home Page 1"
        />
        <Button
          onPress={() => navigate('HomeScreenPageTwo')}
          title="Home Page 2"
        />
        <Button
          onPress={() => navigate('HomeScreenPageThree')}
          title="Home Page 3"
        />
      </View>
    );
  }
}
