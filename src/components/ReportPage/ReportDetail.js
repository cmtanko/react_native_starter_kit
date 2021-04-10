/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {VictoryPie, VictoryTheme} from 'victory-native';
import {Dimensions} from 'react-native';
import cs from '../../styles/common';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const ReportDetail = (props) => {
  let myData = props.data;
  let expenseData = props.expenseData;

  return (
    myData && (
      <View
        pointerEvents="none"
        style={{
          alignItems: 'center',
          padding: 20,
          height: deviceHeight,
          width: deviceWidth,
        }}>
        <View style={cs.chart_block}>
          <Text style={[cs.h2, cs.color_light_blue, cs.padding_large]}>
            Income
          </Text>
          <VictoryPie
            theme={VictoryTheme.material}
            colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
            innerRadius={70}
            labelRadius={160}
            padAngle={({datum}) => datum.y * 0.01}
            width={deviceWidth - 100}
            data={myData}
            events={[]}
            style={{
              labels: {fontSize: '12', fill: 'white'},
            }}
            animate={{
              duration: 1000,
            }}
          />
        </View>
        <View style={cs.padding_large} />
        <View style={cs.chart_block}>
          <Text style={[cs.h2, cs.color_light_red, cs.padding_large]}>
            Expense
          </Text>
          <VictoryPie
            theme={VictoryTheme.material}
            colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
            innerRadius={70}
            labelRadius={170}
            padAngle={({datum}) => datum.y * 0.01}
            width={deviceWidth - 10}
            data={expenseData}
            events={[]}
            style={{
              labels: {fontSize: '12', fill: 'white'},
            }}
            animate={{
              duration: 1000,
            }}
          />
        </View>
      </View>
    )
  );
};

export default connect(null, {})(ReportDetail);
