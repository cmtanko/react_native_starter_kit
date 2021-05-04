/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import moment from 'moment';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {View, Spinner, Text} from 'native-base';

import RecordTimeLine from './RecordTimeLine';
import RecordEmpty from './RecordEmpty';
import {CATEGORY_TYPE} from '../../constants';

import cs from '../../styles/common';
import {getRecords, getAccounts, getCategories, getBackup} from '../../actions';

class RecordList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalEarned: 0,
      totalSpent: 0,
    };
  }

  setSummary(filteredList, categories) {
    let totalEarned = null;
    let totalSpent = null;

    _.each(
      filteredList,
      (list) => {
        const category = _.find(categories, (c) => {
          return c.id === list.categoryId;
        });
        const parsedAmount = parseFloat(list.amount);
        if (category && category.type === CATEGORY_TYPE.INCOME) {
          totalEarned += _.isNaN(parsedAmount) ? 0 : parsedAmount;
        } else if (category && category.type === CATEGORY_TYPE.EXPENSE) {
          totalSpent += _.isNaN(parsedAmount) ? 0 : parsedAmount;
        }
      },
      totalEarned,
      totalSpent,
    );

    if (totalEarned) {
      this.setState({totalEarned});
    }
    if (totalSpent) {
      this.setState({totalSpent});
    }
  }

  componentDidMount() {
    this.props.getRecords();
    this.props.getAccounts();
    this.props.getCategories();
    this.props.getBackup();
  }

  render() {
    const {totalEarned, totalSpent} = this.state;
    const balance = parseFloat(totalEarned - totalSpent).toFixed(2);

    return (
      <View style={cs.bg_dark_lightblue}>
        <View style={cs.summary_header}>
          <Text style={[cs.h4, cs.center, cs.color_white]}>Balance</Text>
          <Text style={[cs.h1, cs.center, cs.color_white]}>$ {balance}</Text>
        </View>

        <View style={cs.header_block}>
          <View style={cs.header_block_left}>
            <Text style={[cs.h3, cs.color_white]}>Total Earned</Text>
            <Text style={[cs.color_light_blue, cs.h3]}>
              + $ {totalEarned.toFixed(2)}
            </Text>
          </View>
          <View style={cs.header_block_right}>
            <Text style={[cs.h3, cs.color_white]}>Total Spent</Text>
            <Text style={[cs.color_light_red, cs.h3]}>
              - $ {totalSpent.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{height: 500}}>{this.showList()}</View>
      </View>
    );
  }

  showList() {
    const {selectedMonth} = this.props;

    let filteredList = _.filter(this.props.records, (record) => {
      return new Date(record.date).getMonth().toString() === selectedMonth;
    });

    filteredList = _.sortBy(filteredList, ['date']);
    const {categories} = this.props;

    this.setSummary(filteredList, categories);

    let refinnedList = [];

    if (filteredList.length > 0 && filteredList[0].id !== 0) {
      refinnedList = _.map(filteredList, (val) => {
        const category = _.find(categories, (c) => {
          return c.id === val.categoryId;
        });

        if (category || val.categoryId === 'transfer_') {
          return {
            ...val,
            title: category && category.title,
            type: category && category.type,
            time: moment(val.date).format('Do'),
          };
        }
        return {
          ...val,
          title: 'Undefined',
          type: 'Undefined',
          time: moment(val.date).format('Do'),
        };
      });
    }

    if (this.props.loading) {
      return <Spinner />;
    }
    if (!_.isEmpty(refinnedList)) {
      return (
        !!this.props.navigate && (
          <RecordTimeLine
            records={refinnedList}
            navigate={this.props.navigate}
          />
        )
      );
    }
    return <RecordEmpty />;
  }
}

const mapStateToProps = (state) => {
  const {
    record: {list: recordList},
    account: {list: accountList},
    category: {list: categoryList},
  } = state;

  const records = _.map(recordList, (val, id) => {
    return val;
  });

  const accounts = _.map(accountList, (val, id) => {
    return val;
  });

  const categories = _.map(categoryList, (val, id) => {
    return val;
  });

  return {records, accounts, categories};
};

export default connect(mapStateToProps, {
  getBackup,
  getRecords,
  getAccounts,
  getCategories,
})(RecordList);
