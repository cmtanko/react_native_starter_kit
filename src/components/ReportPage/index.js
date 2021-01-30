import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Container, Content, Button, Segment, Text} from 'native-base';
import cs from '../../styles/common';
import {selectReportType} from '../../actions';

import ReportDetail from './ReportDetail';

const WEEK_TO_DATE = {
  WEEKLY: 7,
  MONTHLY: 12,
  YEARLY: 365,
};

const ReportPage = (props) => {
  const {selectReportType, selectedReportType} = props;

  let myCatgories = props.categories.filter((obj) => {
    return obj.type === 'INCOME';
  });

  let finalResult = [];

  let myRecords = myCatgories.map((category) => {
    let recordByCategory = props.records.filter((record) => {
      let a = moment();
      let b = moment(record.date);
      let dateDiff = a.diff(b, 'days');

      return (
        record.categoryId === category.id &&
        dateDiff < WEEK_TO_DATE[selectedReportType]
      );
    });

    let mySum = 0;

    _.each(recordByCategory, (record) => {
      mySum += parseFloat(record.amount);
    });

    mySum > 0 &&
      finalResult.push({
        label: category.title + '\n $' + mySum + '',
        y: mySum,
      });
  });

  let myCatgories2 = props.categories.filter((obj) => {
    return obj.type === 'EXPENSE';
  });

  let finalResult2 = [];

  let myRecords2 = myCatgories2.map((category) => {
    let recordByCategory = props.records.filter((record) => {
      let a = moment();
      let b = moment(record.date);
      let dateDiff = a.diff(b, 'days');

      return (
        record.categoryId === category.id &&
        dateDiff < WEEK_TO_DATE[selectedReportType]
      );
    });

    let mySum = 0;

    _.each(recordByCategory, (record) => {
      mySum += parseFloat(record.amount);
    });

    mySum > 0 &&
      finalResult2.push({
        label: category.title + '\n $' + mySum + '',
        x: 20,
        y: mySum,
      });
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

      <Content>
        <ReportDetail
          data={finalResult}
          expenseData={finalResult2}
          yearWiseData={yearWiseData}
        />
      </Content>
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

  const records = _.map(recordList, (val, id) => {
    return val;
  });

  const accounts = _.map(accountList, (val, id) => {
    return val;
  });

  const categories = _.map(categoryList, (val, id) => {
    return val;
  });

  return {records, accounts, categories, selectedReportType};
};

export default connect(mapStateToProps, {selectReportType})(ReportPage);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
