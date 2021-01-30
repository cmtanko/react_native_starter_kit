import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Text, Card, CardItem, Content, Body} from 'native-base';

import cs from '../../styles/common';

const AccountSummary = ({currentBalance}) => {
  return (
    <Content style={[cs.bg_dark_lightblue, {margin: 10}]}>
      <Card>
        <CardItem style={cs.bg_dark_blue}>
          <Body style={cs.card_body}>
            <Text style={[cs.color_light_blue, cs.h2]}>Curent Balance</Text>
            <Text style={cs.color_light_blue}>AUD {currentBalance}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const accounts = _.map(state.account.list, (val) => {
    val.openingBalance = parseFloat(val.openingBalance);
    return val;
  });

  const currentBalance =
    parseFloat(
      parseFloat(_.sumBy(accounts, 'balance')) ||
        0 + parseFloat(_.sumBy(accounts, 'openingBalance') || 0),
    ) || 0;

  return {
    currentBalance: currentBalance
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  };
};

export default connect(mapStateToProps, {})(AccountSummary);
