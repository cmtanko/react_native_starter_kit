/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Container, View, Button, Segment, Text} from 'native-base';

import cs from '../../styles/common';
import {selectReportType} from '../../actions';

import ReportDetail from './ReportDetail';

const ReportPage = (props) => {
  const {selectReportType, selectedReportType} = props;

  return (
    <Container style={cs.bg_dark_lightblue}>
      <Segment style={cs.bg_dark_lightblue}>
        <Button
          first
          style={{
            borderColor: '#1C2544',
            borderBottomWidth: 2,
            borderBottomColor:
              selectedReportType === 'WEEKLY' ? '#22e3c4' : '#1C2544',
            backgroundColor:
              selectedReportType === 'WEEKLY' ? '#1C262E' : '#10151D',
          }}
          active={selectedReportType === 'WEEKLY'}
          onPress={() => {
            selectReportType('WEEKLY');
          }}>
          <Text
            style={{
              color: selectedReportType === 'WEEKLY' ? 'white' : '#666666',
            }}>
            THIS WEEK
          </Text>
        </Button>

        <Button
          style={{
            borderColor: '#1C2544',
            borderBottomWidth: 2,
            borderBottomColor:
              selectedReportType === 'MONTHLY' ? '#22e3c4' : '#1C2544',
            backgroundColor:
              selectedReportType === 'MONTHLY' ? '#1C262E' : '#10151D',
          }}
          onPress={() => {
            selectReportType('MONTHLY');
          }}>
          <Text
            style={{
              color: selectedReportType === 'MONTHLY' ? 'white' : '#666666',
            }}>
            THIS MONTH
          </Text>
        </Button>

        <Button
          last
          style={{
            borderColor: '#1C2544',
            borderBottomWidth: 2,
            borderBottomColor:
              selectedReportType === 'YEARLY' ? '#22e3c4' : '#1C2544',
            backgroundColor:
              selectedReportType === 'YEARLY' ? '#1C262E' : '#10151D',
          }}
          onPress={() => {
            selectReportType('YEARLY');
          }}>
          <Text
            style={{
              color: selectedReportType === 'YEARLY' ? 'white' : '#666666',
            }}>
            THIS YEAR
          </Text>
        </Button>
      </Segment>

      <View>
        <ReportDetail />
      </View>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const {selectedReportType} = state;

  return {
    selectedReportType,
  };
};

export default connect(mapStateToProps, {selectReportType})(ReportPage);
