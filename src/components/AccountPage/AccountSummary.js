import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Text} from '../Typography/Text.component';

import {
  AccountSummaryContent,
  SummaryCard,
  SummaryBody,
  SummaryCardItem,
} from './index.styles';

const AccountSummary = ({currentBalance}) => {
  return (
    <AccountSummaryContent>
      <SummaryCard>
        <SummaryCardItem>
          <SummaryBody>
            <Text variant="heading">Curent Balance</Text>
            <Text>AUD {currentBalance}</Text>
          </SummaryBody>
        </SummaryCardItem>
      </SummaryCard>
    </AccountSummaryContent>
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
