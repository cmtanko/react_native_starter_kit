import _ from 'lodash';
import React, {Component} from 'react';
import {
  Tab,
  Tabs,
  Content,
  Fab,
  Icon,
  Container,
  ScrollableTab,
} from 'native-base';

// import ActionButtonView from './ActionButtonView';
import RecordList from './RecordList';
import {MONTHS} from '../../config';

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
          tabStyle={cs.bg_dark_blue}
          activeTabStyle={cs.bg_dark_lightblue}>
          <Content style={cs.bg_dark_lightblue}>
            <RecordList selectedMonth={id} navigate={navigate} />
          </Content>
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
