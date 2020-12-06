/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from './components/Dashboard';
import HomeScreenPageOne from './components/Dashboard/HomeScreenPageOne';
import HomeScreenPageTwo from './components/Dashboard/HomeScreenPageTwo';
import HomeScreenPageThree from './components/Dashboard/HomeScreenPageThree';

import {View, Text} from 'react-native';

import {COLOR_DARK_BLUE} from './styles/common';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLOR_DARK_BLUE,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerLeft: ({color, size}) => (
            <MaterialCommunityIcons
              name="menu"
              color="#fff"
              size={23}
              style={{paddingLeft: 8}}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="HomeScreenPageOne" component={HomeScreenPageOne} />
      <Stack.Screen name="HomeScreenPageTwo" component={HomeScreenPageTwo} />
      <Stack.Screen
        name="HomeScreenPageThree"
        component={HomeScreenPageThree}
      />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        overlayColor="transparent"
        drawerType="slide"
        drawerStyle={{width: '50%'}}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Accounts"
          component={HomeScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <MaterialCommunityIcons name="bank" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Categories"
          component={HomeScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <MaterialCommunityIcons name="shape" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Report"
          component={HomeScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="chart-bar"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={HomeScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
