import React from 'react';
import {connect} from 'react-redux';
import {Text} from '../Typography/Text.component';
import {selectCurrentBalance} from '../../selector';

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
            <Text variant="subtitle">Total Opening Balance</Text>
            <Text variant="heading">AUD {currentBalance}</Text>
          </SummaryBody>
        </SummaryCardItem>
      </SummaryCard>
    </AccountSummaryContent>
  );
};

const mapStateToProps = (state) => {
  return {
    currentBalance: selectCurrentBalance(state),
  };
};

export default connect(mapStateToProps, {})(AccountSummary);
