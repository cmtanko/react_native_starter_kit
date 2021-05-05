import {connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import Carousel from 'react-native-carousel-view';
import {VictoryPie, VictoryBar, VictoryTheme} from 'victory-native';
import {Text, View, Dimensions, Platform} from 'react-native';

import {} from 'react-native';
import styles from './styles';
import cs from '../../styles/common';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const ReportDetail = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  let myData = props.data;
  let expenseData = props.expenseData;
  const colorScale = ['tomato', 'orange', 'gold', 'cyan', 'navy'];
  return (
    myData.length > 0 && (
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
              colorScale={colorScale}
              innerRadius={70}
              labelRadius={120}
              width={deviceWidth - 40}
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
          <View pointerEvents="none" style={styles.slides}>
            <Text style={[cs.h2, cs.color_light_red, cs.padding_large]}>
              Expense
            </Text>
            <VictoryPie
              theme={VictoryTheme.material}
              colorScale={colorScale}
              innerRadius={70}
              labelRadius={120}
              width={deviceWidth - 40}
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

          <View pointerEvents="none" style={styles.slides}>
            <Text style={[cs.h2, cs.color_light_blue, cs.padding_large]}>
              Cash Flow
            </Text>
            <VictoryBar
              theme={VictoryTheme.material}
              colorScale={colorScale}
              width={deviceWidth - 40}
              data={[...expenseData, ...myData]}
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
