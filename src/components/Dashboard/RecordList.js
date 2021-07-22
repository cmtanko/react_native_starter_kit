/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import React, {PureComponent} from 'react';
import {View, Spinner, Text} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';

import RecordEmpty from './RecordEmpty';
import RecordTimeLine from './RecordTimeLine';
import {selectRecords, selectCategories, selectAccounts} from '../../selector';
import RecordTransactionSummary from './RecordTransactionSummary';
import {CATEGORY_TYPE} from '../../constants';

import cs from '../../styles/common';
import {
  getRecords,
  getAccounts,
  getCategories,
  getBackup,
  getUserInfo,
  getSettings,
} from '../../actions';

class RecordList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalEarned: 0,
      totalSpent: 0,
      selectedType: 'INCOME',
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
    this.props.getBackup();
    this.props.getRecords();
    this.props.getAccounts();
    this.props.getUserInfo();
    this.props.getCategories();
    this.props.getSettings();
  }

  render() {
    const {totalEarned, totalSpent} = this.state;
    const balance = parseFloat(totalEarned - totalSpent).toFixed(2);

    return (
      <View style={[cs.bg_dark_lightblue, {height: '100%'}]}>
        {this.showList(balance, totalEarned, totalSpent)}

        <Modal
          style={[
            styles.modal,
            styles.modal4,
            cs.brandBgColorSecondary,
            {
              borderColor: 'white',
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              borderTopColor:
                this.state.selectedType === 'INCOME' ? '#8658A5' : '#47985D',
              borderTopWidth: 5,
            },
          ]}
          position={'bottom'}
          ref={'modal4'}>
          <RecordTransactionSummary
            records={this.props.records}
            categories={this.props.categories}
            accounts={this.props.accounts}
            selectedMonth={this.props.selectedMonth}
            type={this.state.selectedType}
          />
        </Modal>
      </View>
    );
  }

  showList(balance, totalEarned, totalSpent) {
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
            ListHeaderComponent={() => (
              <View>
                <View style={cs.summary_header}>
                  <Text style={[cs.h4, cs.center, cs.color_white]}>
                    Balance
                  </Text>
                  <Text style={[cs.h1, cs.center, cs.color_white]}>
                    $ {balance}
                  </Text>
                </View>

                <View style={cs.header_block}>
                  <TouchableOpacity
                    style={cs.header_block_left}
                    onPress={() => {
                      this.setState({selectedType: 'INCOME'});
                      this.refs.modal4.open();
                    }}>
                    <View>
                      <Text style={[cs.h3, cs.color_white]}>Total Earned</Text>
                      <Text style={[cs.color_light_blue, cs.h3]}>
                        + $ {totalEarned.toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={cs.header_block_right}
                    onPress={() => {
                      this.setState({selectedType: 'EXPENSE'});
                      this.refs.modal4.open();
                    }}>
                    <View>
                      <Text style={[cs.h3, cs.color_white]}>Total Spent</Text>
                      <Text style={[cs.color_light_red, cs.h3]}>
                        - $ {totalSpent.toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            navigate={this.props.navigate}
          />
        )
      );
    }
    return <RecordEmpty />;
  }
}

const mapStateToProps = (state) => {
  return {
    records: selectRecords(state),
    accounts: selectAccounts(state),
    categories: selectCategories(state),
    settings: state.settings,
  };
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal2: {
    height: 230,
    backgroundColor: '#3B5998',
  },

  modal3: {
    height: 300,
    width: 300,
  },

  modal4: {
    height: '64%',
  },

  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },

  btnModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },

  text: {
    color: 'black',
    fontSize: 22,
  },
});

export default connect(mapStateToProps, {
  getBackup,
  getUserInfo,
  getRecords,
  getSettings,
  getAccounts,
  getCategories,
})(RecordList);
