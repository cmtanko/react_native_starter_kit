/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from './components/Dashboard';

import LockPage from './components/LockPage';
import IntroPage from './components/IntroPage';

import SettingPage from './components/SettingPage';
import ReportPage from './components/ReportPage';

import OverviewPage from './components/Dashboard/Overview';
import RecordAddExpense from './components/Dashboard/RecordAddExpense';
import RecordAddIncome from './components/Dashboard/RecordAddIncome';
import RecordAddTransfer from './components/Dashboard/RecordAddTransfer';

import AccountPage from './components/AccountPage';
import AccountAdd from './components/AccountPage/AccountAdd';
import AccountList from './components/AccountPage/AccountList';

import CategoryPage from './components/CategoryPage';
import CategoryAdd from './components/CategoryPage/CategoryAdd';
import CategoryList from './components/CategoryPage/CategoryList';

import {getSettings, getRecords, setLockedState} from './actions';

import {COLOR_PRIMARY} from './styles/common';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLOR_PRIMARY,
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
      <Stack.Screen
        options={{title: 'Add Record'}}
        name="RecordAddIncome"
        component={RecordAddIncome}
      />
      <Stack.Screen
        options={{title: 'Add Expense'}}
        name="RecordAddExpense"
        component={RecordAddExpense}
      />
      <Stack.Screen
        options={{title: 'Transfer'}}
        name="RecordAddTransfer"
        component={RecordAddTransfer}
      />
      <Stack.Screen
        options={{title: 'Add Category'}}
        name="CategoryAdd"
        component={CategoryAdd}
      />
      <Stack.Screen
        options={{title: 'Add Account'}}
        name="AccountAdd"
        component={AccountAdd}
      />
    </Stack.Navigator>
  );
};

const OverviewStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        initialRouteName: 'Home',
        headerStyle: {
          backgroundColor: COLOR_PRIMARY,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Overview"
        options={{
          headerShown: false,
          title: 'Overview',
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
        component={OverviewPage}
      />
      <Stack.Screen
        options={{title: 'Transactions'}}
        name="Home"
        component={Dashboard}
      />
      <Stack.Screen
        options={{title: 'Add Record'}}
        name="RecordAddIncome"
        component={RecordAddIncome}
      />
      <Stack.Screen
        options={{title: 'Add Expense'}}
        name="RecordAddExpense"
        component={RecordAddExpense}
      />
      <Stack.Screen
        options={{title: 'Transfer'}}
        name="RecordAddTransfer"
        component={RecordAddTransfer}
      />
      <Stack.Screen
        options={{title: 'Categories'}}
        name="Category"
        component={CategoryPage}
      />

      <Stack.Screen
        options={{title: 'Add Category'}}
        name="CategoryAdd"
        component={CategoryAdd}
      />
      <Stack.Screen
        options={{title: 'Accounts'}}
        name="Account"
        component={AccountPage}
      />
      <Stack.Screen
        options={{title: 'Add Account'}}
        name="AccountAdd"
        component={AccountAdd}
      />
    </Stack.Navigator>
  );
};

const AccountStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Accounts',
        headerStyle: {
          backgroundColor: COLOR_PRIMARY,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Account"
        options={{
          title: 'Add Account',
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
        component={AccountPage}
      />

      <Stack.Screen
        options={{title: 'Add Account'}}
        name="AccountAdd"
        component={AccountAdd}
      />
      <Stack.Screen
        options={{title: 'Add Account'}}
        name="AccountList"
        component={AccountList}
      />
    </Stack.Navigator>
  );
};

const CategoryStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLOR_PRIMARY,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Category"
        component={CategoryPage}
        options={{
          title: 'Categories',
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
      <Stack.Screen
        options={{title: 'Add Category'}}
        name="CategoryAdd"
        component={CategoryAdd}
      />
      <Stack.Screen
        options={{title: 'Add Category'}}
        name="CategoryList"
        component={CategoryList}
      />
    </Stack.Navigator>
  );
};

const ReportStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Reports',
        headerStyle: {
          backgroundColor: COLOR_PRIMARY,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: ({color, size}) => (
          <MaterialCommunityIcons
            name="menu"
            color="#fff"
            size={23}
            style={{paddingLeft: 8}}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="Report" component={ReportPage} />
    </Stack.Navigator>
  );
};

const SettingStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: 'Settings',
        headerStyle: {
          backgroundColor: COLOR_PRIMARY,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: ({color, size}) => (
          <MaterialCommunityIcons
            name="menu"
            color="#fff"
            size={23}
            style={{paddingLeft: 8}}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="Setting" component={SettingPage} />
    </Stack.Navigator>
  );
};

const LockScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LockedScreen" component={LockPage} />
    </Stack.Navigator>
  );
};

const IntroScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LockedScreen" component={IntroPage} />
    </Stack.Navigator>
  );
};

const HomeDrawer = ({navigation}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Overview"
      overlayColor="transparent"
      drawerType="slide"
      drawerStyle={{width: '56%'}}>
      <Drawer.Screen
        name="Overview"
        component={OverviewStack}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Transactions"
        component={HomeStack}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons name="signal" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Accounts"
        component={AccountStack}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bank" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoryStack}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons name="shape" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={ReportStack}
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
        component={SettingStack}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

function App(props, {locked, shouldLock}) {
  const shouldAppShowLockScreen = useSelector(
    (state) => state.setting.preference.lockscreen,
  );

  useEffect(() => {
    props.getSettings();
    props.getRecords();
  }, []);

  const isAppUnLocked = useSelector((state) => !state.setting.locked);
  const isAppPreviouslyUsed = useSelector(
    (state) => state.record.list.length > 0,
  );

  const dispatch = useDispatch();
  const uploadLockedState = (note) => dispatch(setLockedState());

  const showLockScreen =
    shouldAppShowLockScreen === 'true' ? (isAppUnLocked ? false : true) : false;

  return (
    <NavigationContainer>
      {showLockScreen ? (
        <LockScreen />
      ) : isAppPreviouslyUsed || !props.introShow ? (
        <HomeDrawer />
      ) : (
        <IntroScreen />
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    locked: state.backup.locked,
    shouldLock: state.setting.preference.lockscreen,
    record: state.record,
    introShow: state.intro.show,
  };
};

export default connect(mapStateToProps, {getSettings, getRecords})(App);
