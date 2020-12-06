// import 'react-native-get-random-values';

import {REPORT_TYPE_UPDATE} from '../types';

export const selectReportType = (value) => {
  return {
    type: REPORT_TYPE_UPDATE,
    payload: value,
  };
};
