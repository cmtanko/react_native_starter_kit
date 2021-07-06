import React from 'react';
import {connect} from 'react-redux';
import Carousel from 'react-native-carousel-view';
import {View, Dimensions, Platform} from 'react-native';

import styles from './styles';

import PieChart from './PieChart';
import ExpenseBarChart from './ExpenseBarChart';
import CategoryBasedReport from './CategoryBasedReport';

const deviceHeight = Dimensions.get('window').height;

const ReportDetail = (props) => {
  return (
    <View>
      <Carousel
        height={deviceHeight}
        loop={false}
        indicatorAtBottom
        indicatorOffset={deviceHeight / 3}
        indicatorSize={Platform.OS === 'android' ? 15 : 10}
        animate={false}>
        <View pointerEvents="none" style={styles.slides}>
          <PieChart title={'Income'} type={'INCOME'} />
        </View>
        <View pointerEvents="none" style={styles.slides}>
          <PieChart title={'Expense'} type={'EXPENSE'} />
        </View>
        <View pointerEvents="auto" style={styles.slides}>
          <ExpenseBarChart />
        </View>
        <View pointerEvents="auto" style={styles.slides}>
          <CategoryBasedReport />
        </View>
      </Carousel>
    </View>
  );
};

export default connect(null, {})(ReportDetail);
