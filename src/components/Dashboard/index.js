import _ from 'lodash';
import React, {Component} from 'react';
import {
  Fab,
  Tab,
  Tabs,
  View,
  Icon,
  Header,
  Container,
  ScrollableTab,
} from 'native-base';

import {MONTHS} from '../../config';
import RecordList from './RecordList';

import cs from '../../styles/common';

export default class Dashboard extends Component {
  componentDidMount() {
    const currentMonth = new Date().getMonth();
    this.tabTimeOut = setTimeout(
      this.tabs.goToPage.bind(this.tabs, currentMonth),
    );
  }

  componentWillUnmount() {
    clearTimeout(this.tabTimeOut);
  }

  render() {
    const {navigate} = this.props.navigation;

    const listTabs = _.map(MONTHS, (val, id) => {
      return (
        <Tab
          key={id}
          heading={val}
          style={cs.brandBgColorPrimary}
          tabStyle={cs.brandBgColorPrimary}
          activeTabStyle={[cs.brandBgColorSecondary, cs.brandColorTertiary]}>
          <View style={cs.bg_dark_lightblue}>
            <RecordList selectedMonth={id} navigate={navigate} />
          </View>
        </Tab>
      );
    });

    return (
      <Container>
        <Tabs
          ref={(c) => {
            this.tabs = c;
          }}
          tabBarPosition="top"
          tabBarUnderlineStyle={cs.brandBgColorTertiary}
          renderTabBar={() => <ScrollableTab />}>
          {listTabs}
        </Tabs>
        <Fab
          onPress={() => {
            navigate('RecordAddIncome');
          }}
          direction="up"
          style={cs.bg_light_green}
          position="bottomRight">
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
