import _ from 'lodash';
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
            <Text variant="heading">Curent Balance</Text>
            <Text>AUD {currentBalance}</Text>
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
