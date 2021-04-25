/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View, Dimensions, Platform} from 'react-native';
import {VictoryPie, VictoryTheme} from 'victory-native';
import Carousel from 'react-native-carousel-view';

import {} from 'react-native';
import cs from '../../styles/common';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const ReportDetail = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  let myData = props.data;
  let expenseData = props.expenseData;

  return (
    myData && (
      <View>
        <Carousel
          height={deviceHeight}
          loop={false}
          indicatorAtBottom
          indicatorOffset={deviceHeight / 3}
          indicatorSize={Platform.OS === 'android' ? 15 : 10}
          animate={false}>
          <View pointerEvents="none" style={styles.slides}>
            <Text style={[cs.h2, cs.color_light_blue, cs.padding_large]}>
              Income
            </Text>
            <VictoryPie
              theme={VictoryTheme.material}
              colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
              innerRadius={70}
              labelRadius={170}
              padAngle={({datum}) => datum.y * 0.01}
              width={deviceWidth - 10}
              data={myData}
              events={[]}
              style={{
                labels: styles.labels,
              }}
              animate={{
                duration: 1000,
              }}
            />
          </View>
          <View
            pointerEvents="none"
            style={{
              alignItems: 'center',
              padding: 20,
              height: deviceHeight,
              width: deviceWidth,
            }}>
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
                labels: styles.labels,
              }}
              animate={{
                duration: 1000,
              }}
            />
          </View>
        </Carousel>
      </View>
    )
  );
};

export default connect(null, {})(ReportDetail);
