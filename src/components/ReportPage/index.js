import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Container, View, Button, Segment, Text} from 'native-base';

import cs from '../../styles/common';
import {selectReportType} from '../../actions';

import ReportDetail from './ReportDetail';

const WEEK_TO_DATE = {
  WEEKLY: 7,
  MONTHLY: 30,
  YEARLY: 365,
};

const ReportPage = (props) => {
  const {records, selectReportType, selectedReportType} = props;
  const incomeCatgories = props.categories.filter((obj) => {
    return obj.type === 'INCOME';
  });

  const expenseCategories = props.categories.filter((obj) => {
    return obj.type === 'EXPENSE';
  });

  let yearWiseData = [
    {x: 'Jan', y: 20},
    {x: 'Feb', y: 3},
    {x: 'Mar', y: 5},
    {x: 'Apr', y: 4},
    {x: 'May', y: 7},
    {x: 'Jun', y: 2},
    {x: 'Jul', y: 3},
    {x: 'Aug', y: 5},
    {x: 'Sep', y: 4},
    {x: 'Oct', y: 8},
    {x: 'Nov', y: 7},
    {x: 'Dec', y: 7},
  ];

  const getData = (categories, allRecords) => {
    return categories.map((category) => {
      let recordByCategory = allRecords.filter((record) => {
        const todayDate = moment();
        const recordDate = moment(record.date);
        const dateDiff = todayDate.diff(recordDate, 'days');

        return (
          record.categoryId === category.id &&
          dateDiff < WEEK_TO_DATE[selectedReportType]
        );
      });

      let sumOfIncome = 0;

      _.each(recordByCategory, (record) => {
        sumOfIncome += parseFloat(record.amount);
      });

      return {
        label: sumOfIncome > 0 ? category.title + '\n $' + sumOfIncome : ' ',
        y: sumOfIncome > 0 ? parseInt(sumOfIncome, 10) : 0,
      };
    });
  };

  return (
    <Container style={cs.bg_dark_lightblue}>
      <Segment style={cs.bg_dark_lightblue}>
        <Button
          first
          active={selectedReportType === 'WEEKLY'}
          onPress={() => {
            selectReportType('WEEKLY');
          }}>
          <Text>THIS WEEK</Text>
        </Button>

        <Button
          active={selectedReportType === 'MONTHLY'}
          onPress={() => {
            selectReportType('MONTHLY');
          }}>
          <Text>THIS MONTH</Text>
        </Button>

        <Button
          last
          active={selectedReportType === 'YEARLY'}
          onPress={() => {
            selectReportType('YEARLY');
          }}>
          <Text>THIS YEAR</Text>
        </Button>
      </Segment>

      <View>
        <ReportDetail
          data={getData(incomeCatgories, records)}
          expenseData={getData(expenseCategories, records)}
          yearWiseData={yearWiseData}
        />
      </View>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const {
    record: {list: recordList},
    account: {list: accountList},
    category: {list: categoryList},
    selectedReportType,
  } = state;

  const records = recordList.map((val, id) => {
    return val;
  });

  const accounts = accountList.map((val, id) => {
    return val;
  });

  const categories = categoryList.map((val, id) => {
    return val;
  });

  return {records, accounts, categories, selectedReportType};
};

export default connect(mapStateToProps, {selectReportType})(ReportPage);
