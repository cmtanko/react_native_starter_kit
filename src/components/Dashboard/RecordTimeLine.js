/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

import cs, {COLOR_LIGHT_BLUE, COLOR_LIGHT_YELLOW} from '../../styles/common';
import {CATEGORY_TYPE} from '../../constants';

const RecordTimeLine = ({records, navigate}) => {
  return (
    <Timeline
      data={records}
      timeStyle={{color: 'white'}}
      circleColor={COLOR_LIGHT_BLUE}
      lineColor={COLOR_LIGHT_YELLOW}
      descriptionStyle={{color: COLOR_LIGHT_YELLOW}}
      titleStyle={cs.color_light_blue}
      options={{
        style: {paddingTop: 10},
      }}
      renderDetail={(rowData) => {
        let {title, amount, description, type} = rowData;
        return (
          <TouchableOpacity
            onPress={() => {
              navigate('RecordAddIncome', {record: rowData});
            }}
            style={{marginTop: -10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text style={cs.color_light_blue}>{title}</Text>
                <Text style={cs.timeline_description}>{description}</Text>
              </View>
              <View style={{flex: 1}}>
                {type === CATEGORY_TYPE.INCOME && (
                  <Text style={cs.timeline_amount_income}>{amount}</Text>
                )}
                {type === CATEGORY_TYPE.EXPENSE && (
                  <Text style={cs.timeline_amount_expense}>- {amount}</Text>
                )}
                {type === CATEGORY_TYPE.TRANSFER && (
                  <Text style={cs.timeline_amount_transfer}>- {amount}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default RecordTimeLine;
